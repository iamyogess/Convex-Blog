import React from "react";
import { Clock, User, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  return (
    <div className="min-h-screen mt-20 lg:mt-28">
   <main className="container mx-auto px-4 py-8">
        <article className="mx-auto max-w-3xl">
          {/* Featured Image */}
          <div className="mb-8 overflow-hidden rounded-lg">
            <img
              src="https://images.pexels.com/photos/8052684/pexels-photo-8052684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Blog featured image"
              className="h-[400px] w-full object-cover"
            />
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold">
              The Future of Web Development: What's Next in 2025
            </h1>

            {/* Article Metadata */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Yogesh Shrestha</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>February 11, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>5 mins read</span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose max-w-none">
            <p className="mb-6 text-lg leading-relaxed dark:text-gray-200">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>

            <h2 className="mb-4 mt-8 text-2xl font-bold">
              The Evolution of Frontend Development
            </h2>
            <p className="mb-6 text-lg leading-relaxed dark:text-gray-200">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>

            <h2 className="mb-4 mt-8 text-2xl font-bold">
              Emerging Technologies
            </h2>
            <p className="mb-6 text-lg leading-relaxed dark:text-gray-200">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>

            <blockquote className="my-8 border-l-4 border-gray-300 pl-4 italic">
              "The future of web development lies in creating more intuitive,
              accessible, and performant applications that serve users across all
              devices and platforms."
            </blockquote>

            <h2 className="mb-4 mt-8 text-2xl font-bold">
              Looking Ahead
            </h2>
            <p className="mb-6 text-lg leading-relaxed dark:text-gray-200">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>
          </div>

          {/* Author Bio */}
          <div className="mt-12 rounded-lg p-6 border">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full">
                <img
                  src="https://images.pexels.com/photos/18390118/pexels-photo-18390118/free-photo-of-sitting-woman-against-orange-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Author"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">Yogesh Shrestha</h3>
                <p className="text-sm dark:text-gray-300">
                  Frontend Developer & Technical Writer
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>     
    </div>
  );
};

export default BlogPost;