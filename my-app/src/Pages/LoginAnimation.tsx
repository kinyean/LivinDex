import { useEffect } from 'react';
import { animate } from 'animejs'; // Motion One

const LoginAnimation: React.FC = () => {
  useEffect(() => {
    const path = document.querySelector('path');
    if (!path) return;

    const handleFocus = (offset: number, dash: string) => {
      animate(path, {
        strokeDashoffset: offset,
        strokeDasharray: dash,
      });
    };

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const submit = document.getElementById('submit');

    const emailFocus = () => handleFocus(0, '240 1386');
    const passwordFocus = () => handleFocus(-336, '240 1386');
    const submitFocus = () => handleFocus(-730, '530 1386');

    email?.addEventListener('focus', emailFocus);
    password?.addEventListener('focus', passwordFocus);
    submit?.addEventListener('focus', submitFocus);

    return () => {
      email?.removeEventListener('focus', emailFocus);
      password?.removeEventListener('focus', passwordFocus);
      submit?.removeEventListener('focus', submitFocus);
    };
  }, []);

  return null;
};

export default LoginAnimation;
