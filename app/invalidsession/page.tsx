'use client';

import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

export default function InvalidSession(){
  useEffect(() => {
    (async () => {
      toast('Too many devices connected. Logging out!', {
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await signOut({
        callbackUrl: '/signin',
      });
    })();
  }, []);

  return (
    <div>
    </div>
  );
};