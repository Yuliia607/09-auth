import Link from 'next/link';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  return (
    <>
      <li className={css.navigationItem}>
        <Link
          href="/sign-in"
          prefetch={false}
          className={css.navigationLink}
        >
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link
          href="/sign-up"
          prefetch={false}
          className={css.navigationLink}
        >
          Sign up
        </Link>
      </li>
    </>
  );
}