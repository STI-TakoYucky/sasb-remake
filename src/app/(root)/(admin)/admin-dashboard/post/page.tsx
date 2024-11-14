import { PostPageForm } from "@/components/adminComponents";
import React from "react";

export default function PostPage() {
  return (
    <main className="py-20">
      <section className="global-mx py-20">
        <h1 className="text-3xl font-bold uppercase mb-6">Create post</h1>

        <PostPageForm></PostPageForm>
      </section>
    </main>
  );
}
