import Image from 'next/image'
import Link from 'next/link'

const AuthenticationPage = ( { linkName, link, styles, children }:any ) => {
  return (
    <main className="flex justify-center items-center h-[100dvh] bg-primary-200">
      <section className={styles}>
        <div className="flex items-center justify-center flex-col mb-5">
          <Image
            src={"/images/logo.png"}
            width={100}
            height={100}
            alt="scc logo"
            className="bg-primary-100 rounded-full p-3"
          />
          <h1 className="font-bold text-2xl mt-3">Welcome to SASB!</h1>
        </div>

        {children}

        <div className="text-center w-[80%] relative flex flex-col items-center mb-5">
          <p className="bg-white text-primary z-50 px-5">OR</p>
          <div className="bg-primary w-full h-[2px] absolute top-3"></div>
        </div>

        <div>
          <p>
            Need an account?{" "}
            <Link href={link} className="underline text-primary-200">
              {linkName}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default AuthenticationPage;
