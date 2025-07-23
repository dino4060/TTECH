'use client';
import LoadingSuspense from '@/components/uncategory/LoadingSuspense';
import { UserAuth } from '@/context/AuthContext';
import { authApi } from '@/lib/api/auth.api';
import { clientFetch } from '@/lib/http/fetch.client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { motion } from "framer-motion";
import { FcCancel, FcGoogle } from 'react-icons/fc';

const GoogleAuthPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = UserAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      const loginViaGoogle = async () => {
        setLoading(true);
        const { success, data: auth, error } = await clientFetch(authApi.loginViaGoogle({ code }));

        if (!success) {
          setError(error);
        } else {
          setUser(auth.currentUser);
          setToken(auth.accessToken);
          router.push('/');
        }
        setLoading(false);
      };

      loginViaGoogle();
    } else {
      setError('Không tìm thấy mã xác thực từ Google');
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center h-[90vh] px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="mx-auto flex justify-center"
              >
                <FcGoogle className="h-16 w-16" />
              </motion.div>
              <h2 className="text-3xl font-bold mt-6">Đang xác thực với Google...</h2>
              <p className="text-xl text-gray-500">Vui lòng đợi trong giây lát.</p>
            </>
          ) : error && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-red-50 border border-red-200 rounded-lg p-6"
            >
              <div className="flex flex-col items-center">
                <FcCancel className="h-12 w-12 mb-3" />
                <h3 className="text-2xl font-bold text-red-700 mb-2">Lỗi xác thực với Google</h3>
                <p className="text-xl text-red-600 mb-3">{error}</p>
                <Link
                  href="/login"
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  ← Quay lại
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const WrappedGoogleAuthPage = () => {
  return (
    <LoadingSuspense>
      <GoogleAuthPage />
    </LoadingSuspense>
  );
}

export default WrappedGoogleAuthPage;
