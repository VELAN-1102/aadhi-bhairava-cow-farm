import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'expo-router';
import useAuthStore from '../../src/store/authStore';
import apiClient from '../../src/api/client';
import { Shield, Mail, Lock } from 'lucide-react-native';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const response = await apiClient.post('/auth/login', {
        email: data.email,
        password: data.password,
      });

      const { accessToken, refreshToken, user } = response.data.data;
      
      // Save tokens & profile in zustand + SecureStore
      await login(accessToken, refreshToken, user);
      
      router.replace('/(tabs)');
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-primary-dark">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 justify-center px-6 py-12">
            {/* Logo and Tagline Header */}
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-primary justify-center items-center rounded-full mb-3 shadow-lg">
                <Shield size={40} color="#ffffff" />
              </View>
              <Text className="text-3xl font-bold text-white text-center font-poppins">
                Aadhi Bhairava
              </Text>
              <Text className="text-white text-base opacity-90 mt-1 font-inter">
                Smart Dairy. Smarter Farming.
              </Text>
            </View>

            {/* Glassmorphism-style Form Box */}
            <View className="bg-white/10 border border-white/20 p-6 rounded-3xl shadow-xl backdrop-blur-md">
              <Text className="text-2xl font-semibold text-white mb-6 font-poppins text-center">
                Sign In
              </Text>

              {errorMessage && (
                <View className="bg-red-500/20 border border-red-500/30 p-3 rounded-xl mb-4">
                  <Text className="text-red-300 text-center text-sm font-inter">{errorMessage}</Text>
                </View>
              )}

              {/* Email Input */}
              <View className="mb-4">
                <Text className="text-white text-sm font-medium mb-1 font-inter">Email Address</Text>
                <View className="flex-row items-center bg-white/20 border border-white/15 rounded-xl px-3 py-1">
                  <Mail size={20} color="#ffffff" style={{ marginRight: 8, opacity: 0.8 }} />
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className="flex-1 text-white text-base font-inter h-10"
                        placeholder="email@example.com"
                        placeholderTextColor="#a5d6a7"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>
                {errors.email && (
                  <Text className="text-red-300 text-xs mt-1 font-inter">{errors.email.message}</Text>
                )}
              </View>

              {/* Password Input */}
              <View className="mb-6">
                <Text className="text-white text-sm font-medium mb-1 font-inter">Password</Text>
                <View className="flex-row items-center bg-white/20 border border-white/15 rounded-xl px-3 py-1">
                  <Lock size={20} color="#ffffff" style={{ marginRight: 8, opacity: 0.8 }} />
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className="flex-1 text-white text-base font-inter h-10"
                        placeholder="••••••••"
                        placeholderTextColor="#a5d6a7"
                        secureTextEntry
                        autoCapitalize="none"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>
                {errors.password && (
                  <Text className="text-red-300 text-xs mt-1 font-inter">{errors.password.message}</Text>
                )}
              </View>

              {/* Forgot Password Trigger */}
              <TouchableOpacity
                onPress={() => router.push('/(auth)/forgot-password')}
                className="align-self-end mb-6"
              >
                <Text className="text-primary-light text-right text-sm font-inter">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="bg-primary py-3.5 rounded-xl shadow-md active:bg-primary-dark"
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text className="text-white text-center font-bold text-base font-poppins">
                    Login
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
