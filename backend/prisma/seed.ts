import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Seed Breeds
  const breeds = [
    { name: 'Gir', description: 'Famous Indian dairy breed from Gujarat, known for high milk yield and heat tolerance.' },
    { name: 'Sahiwal', description: 'Premium tick-resistant Zebu dairy breed originating from Punjab region.' },
    { name: 'Hallikar', description: 'Traditional draft breed native to Karnataka, highly resilient.' },
    { name: 'Ongole', description: 'Traditional breed from Andhra Pradesh, known for dual work and milk capacity.' },
    { name: 'Jersey', description: 'Small breed of dairy cattle, famous for high butterfat content in milk.' },
    { name: 'Holstein Friesian', description: 'High-production European dairy breed with characteristic black-and-white patches.' },
    { name: 'HF Cross', description: 'Hybrid cross breed combining local resilience with Holstein Friesian production yield.' },
    { name: 'Murrah Buffalo', description: 'Premier water buffalo breed from Haryana, famous for rich milk fat.' }
  ];

  console.log('Upserting Cow Breeds...');
  const breedMap: Record<string, string> = {};
  for (const b of breeds) {
    const breed = await prisma.cowBreed.upsert({
      where: { name: b.name },
      update: { description: b.description },
      create: { name: b.name, description: b.description }
    });
    breedMap[b.name] = breed.id;
  }

  // 2. Seed Permissions
  const permissions = [
    { name: 'manage:users', description: 'Create, update, delete user accounts' },
    { name: 'read:users', description: 'View user accounts' },
    { name: 'manage:cows', description: 'Manage livestock inventory and details' },
    { name: 'read:cows', description: 'View livestock records' },
    { name: 'manage:milk', description: 'Enter and update daily milk yields' },
    { name: 'read:milk', description: 'View milk yield analytics' },
    { name: 'manage:veterinary', description: 'Manage treatments, diagnostics, and vaccinations' },
    { name: 'read:veterinary', description: 'View health records' },
    { name: 'manage:inventory', description: 'Manage feeds, medicine stocks, and tools' },
    { name: 'read:inventory', description: 'View warehouse stocks' },
    { name: 'manage:finance', description: 'Log expenses, revenues, and payroll' },
    { name: 'read:finance', description: 'View financial ledgers and tax reports' },
    { name: 'manage:employees', description: 'Manage employee directories and contracts' },
    { name: 'read:employees', description: 'View employee registers' },
    { name: 'manage:settings', description: 'Configure farm attributes' },
    { name: 'read:settings', description: 'View farm attributes' }
  ];

  console.log('Upserting Permissions...');
  const permMap: Record<string, string> = {};
  for (const p of permissions) {
    const perm = await prisma.permission.upsert({
      where: { name: p.name },
      update: { description: p.description },
      create: { name: p.name, description: p.description }
    });
    permMap[p.name] = perm.id;
  }

  // 3. Seed Roles & RolePermissions
  const roles = [
    { name: 'ADMINISTRATOR', description: 'Full access to the entire smart dairy farm ecosystem.', perms: Object.keys(permMap) },
    { name: 'FARM_OWNER', description: 'High-level business overview and report access.', perms: ['read:users', 'read:cows', 'read:milk', 'read:veterinary', 'read:inventory', 'read:finance', 'read:employees', 'read:settings'] },
    { name: 'FARM_MANAGER', description: 'Operates daily activities and schedules.', perms: ['read:users', 'manage:cows', 'read:cows', 'manage:milk', 'read:milk', 'manage:veterinary', 'read:veterinary', 'manage:inventory', 'read:inventory', 'read:finance', 'manage:employees', 'read:employees'] },
    { name: 'VETERINARIAN', description: 'Focuses on medical issues, diagnostics, and vaccinations.', perms: ['read:cows', 'manage:veterinary', 'read:veterinary', 'read:inventory'] },
    { name: 'MILK_COLLECTION_OFFICER', description: 'Logs daily milk quality fat/SNF levels.', perms: ['read:cows', 'manage:milk', 'read:milk'] },
    { name: 'INVENTORY_MANAGER', description: 'Maintains feed and medicine stocks.', perms: ['manage:inventory', 'read:inventory'] },
    { name: 'FINANCE_MANAGER', description: 'Reviews expenses and ledger logs.', perms: ['manage:finance', 'read:finance'] },
    { name: 'EMPLOYEE', description: 'Farms task checklists and attendance tracker.', perms: ['read:cows', 'read:milk', 'read:inventory'] },
    { name: 'CUSTOMER', description: 'End-users buying raw farm products.', perms: [] },
    { name: 'VIEWER', description: 'Read-only access for visitors.', perms: ['read:cows', 'read:milk'] }
  ];

  console.log('Upserting Roles & Permissions bindings...');
  const roleMap: Record<string, string> = {};
  for (const r of roles) {
    const role = await prisma.role.upsert({
      where: { name: r.name },
      update: { description: r.description },
      create: { name: r.name, description: r.description }
    });
    roleMap[r.name] = role.id;

    // Clean existing permissions for this role to avoid duplicates
    await prisma.rolePermission.deleteMany({
      where: { roleId: role.id }
    });

    // Create new permissions bindings
    for (const pName of r.perms) {
      await prisma.rolePermission.create({
        data: {
          roleId: role.id,
          permissionId: permMap[pName]
        }
      });
    }
  }

  // 4. Seed Admin User
  const adminEmail = 'admin@cowfarm.com';
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('admin123', salt);

  console.log('Seeding default Admin User...');
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      passwordHash,
      firstName: 'Aadhi',
      lastName: 'Bhairava',
      phone: '+919999999999',
      roleId: roleMap['ADMINISTRATOR'],
      isActive: true
    }
  });

  // 5. Seed Setting Variables
  const settings = [
    { key: 'farm_name', value: 'Aadhi Bhairava Cow Farm', group: 'SYSTEM' },
    { key: 'milk_base_price', value: '65.00', group: 'SYSTEM' },
    { key: 'currency', value: 'INR', group: 'SYSTEM' },
    { key: 'low_stock_threshold_kg', value: '100.00', group: 'SYSTEM' },
    { key: 'backup_schedule', value: '0 0 * * *', group: 'BACKUP' },
    { key: 'smtp_host', value: 'smtp.mailtrap.io', group: 'EMAIL' },
    { key: 'smtp_port', value: '2525', group: 'EMAIL' }
  ];

  console.log('Seeding default Settings...');
  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value, group: s.group },
      create: { key: s.key, value: s.value, group: s.group }
    });
  }

  // 6. Seed initial Cow Data
  console.log('Seeding baseline cattle records...');
  const sampleCows = [
    { tagNumber: 'COW-0001', name: 'Ganga', breedName: 'Gir', dob: new Date('2020-03-12'), weight: 420.50, color: 'Reddish Brown', status: 'LACTATING' },
    { tagNumber: 'COW-0002', name: 'Yamuna', breedName: 'Sahiwal', dob: new Date('2021-05-18'), weight: 385.00, color: 'Light Brown', status: 'PREGNANT' },
    { tagNumber: 'COW-0003', name: 'Kamadhenu', breedName: 'Holstein Friesian', dob: new Date('2019-11-04'), weight: 520.00, color: 'Black & White', status: 'DRY' },
    { tagNumber: 'COW-0004', name: 'Nandini', breedName: 'Gir', dob: new Date('2022-01-20'), weight: 350.00, color: 'Dark Red', status: 'HEALTHY' },
    { tagNumber: 'BUF-0001', name: 'Krishna', breedName: 'Murrah Buffalo', dob: new Date('2021-08-15'), weight: 580.00, color: 'Jet Black', status: 'LACTATING' }
  ];

  for (const sc of sampleCows) {
    const cow = await prisma.cow.upsert({
      where: { tagNumber: sc.tagNumber },
      update: {
        name: sc.name,
        breedId: breedMap[sc.breedName],
        gender: 'FEMALE',
        dateOfBirth: sc.dob,
        weight: sc.weight,
        color: sc.color,
        status: sc.status
      },
      create: {
        tagNumber: sc.tagNumber,
        name: sc.name,
        breedId: breedMap[sc.breedName],
        gender: 'FEMALE',
        dateOfBirth: sc.dob,
        weight: sc.weight,
        color: sc.color,
        status: sc.status
      }
    });

    // Seed mock milk collections for lactating cows
    if (sc.status === 'LACTATING') {
      await prisma.milkCollection.create({
        data: {
          cowId: cow.id,
          quantity: 12.5,
          shift: 'MORNING',
          date: new Date(),
          fatPercentage: 4.8,
          snfPercentage: 8.5,
          temperature: 36.5,
          collectedBy: 'Staff Operator'
        }
      });
      await prisma.milkCollection.create({
        data: {
          cowId: cow.id,
          quantity: 9.8,
          shift: 'EVENING',
          date: new Date(),
          fatPercentage: 5.1,
          snfPercentage: 8.6,
          temperature: 36.2,
          collectedBy: 'Staff Operator'
        }
      });
    }
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
