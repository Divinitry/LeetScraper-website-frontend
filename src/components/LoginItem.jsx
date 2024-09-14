function LoginItem() {
  return (
    <div className="outline py-36 text-center w-full">
      <h1 className="text-5xl font-bold">Don't have an account?</h1>
      <p className="py-5">Sign up below!</p>

      <div className="pt-5">
      <a href="/register">
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none mx-auto">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
            Sign up
          </span>
        </button>
      </a>
      </div>
    </div>
  );
}

export default LoginItem;
