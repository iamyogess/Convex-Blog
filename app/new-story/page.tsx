import { Input } from "@/components/ui/input";
import { Image } from "lucide-react";
import React from "react";

const NewStory = () => {
  return (
    <section className="min-h-screen w-full mt-20 lg:mt-28">
      <div className="w-full max-w-screen-md mx-auto">
        <div className="h-96 p-10 flex justify-center items-center m-4 rounded-lg bg-gray-200 dark:bg-gray-800">
          <Image className="h-10 w-10" />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Title"
            className="border-none outline-none py-16 m-4 placeholder:text-4xl"
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Tell your story..."
            className="border-none outline-none py-6 m-4 placeholder:text-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default NewStory;
