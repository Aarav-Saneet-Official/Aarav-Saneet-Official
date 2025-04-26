
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

export default function AaravSaneetOfficial() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ text: "", media: null });
  const [comments, setComments] = useState({});

  const handlePost = () => {
    if (!isAdmin) return;
    setPosts([...posts, newPost]);
    setNewPost({ text: "", media: null });
  };

  const handleComment = (index, comment, media) => {
    const newComments = { ...comments };
    if (!newComments[index]) newComments[index] = [];
    newComments[index].push({ comment, media });
    setComments(newComments);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Aarav Saneet Official</h1>
      <Button onClick={() => setIsAdmin(!isAdmin)}>
        {isAdmin ? "Switch to User View" : "Switch to Admin View"}
      </Button>

      {isAdmin && (
        <Card className="my-4">
          <CardContent className="space-y-2">
            <Textarea
              placeholder="Write your post..."
              value={newPost.text}
              onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
            />
            <Input
              type="file"
              accept="image/*,video/*,application/pdf"
              onChange={(e) => setNewPost({ ...newPost, media: e.target.files[0] })}
            />
            <Button onClick={handlePost}>Post</Button>
          </CardContent>
        </Card>
      )}

      {posts.map((post, index) => (
        <Card key={index} className="my-4">
          <CardContent className="space-y-2">
            <p>{post.text}</p>
            {post.media && (
              <div>
                {post.media.type.startsWith("image") && (
                  <div>
                    <img
                      src={URL.createObjectURL(post.media)}
                      alt="media"
                      className="w-full rounded"
                    />
                    <a
                      href={URL.createObjectURL(post.media)}
                      download
                      className="text-blue-500 underline"
                    >
                      Download Image
                    </a>
                  </div>
                )}
                {post.media.type.startsWith("video") && (
                  <div>
                    <video controls className="w-full">
                      <source src={URL.createObjectURL(post.media)} />
                    </video>
                    <a
                      href={URL.createObjectURL(post.media)}
                      download
                      className="text-blue-500 underline"
                    >
                      Download Video
                    </a>
                  </div>
                )}
                {!post.media.type.startsWith("image") &&
                  !post.media.type.startsWith("video") && (
                    <a
                      href={URL.createObjectURL(post.media)}
                      download
                      className="text-blue-500 underline"
                    >
                      Download File
                    </a>
                  )}
              </div>
            )}

            <div className="mt-4 space-y-2">
              <h2 className="text-xl font-semibold">Comments</h2>
              {(comments[index] || []).map((c, i) => (
                <div key={i} className="p-2 border rounded">
                  <p>{c.comment}</p>
                  {c.media && (
                    <div>
                      {c.media.type.startsWith("image") && (
                        <div>
                          <img
                            src={URL.createObjectURL(c.media)}
                            alt="comment media"
                            className="w-32"
                          />
                          <a
                            href={URL.createObjectURL(c.media)}
                            download
                            className="text-blue-500 underline"
                          >
                            Download Image
                          </a>
                        </div>
                      )}
                      {c.media.type.startsWith("video") && (
                        <div>
                          <video controls className="w-32">
                            <source src={URL.createObjectURL(c.media)} />
                          </video>
                          <a
                            href={URL.createObjectURL(c.media)}
                            download
                            className="text-blue-500 underline"
                          >
                            Download Video
                          </a>
                        </div>
                      )}
                      {!c.media.type.startsWith("image") &&
                        !c.media.type.startsWith("video") && (
                          <a
                            href={URL.createObjectURL(c.media)}
                            download
                            className="text-blue-500 underline"
                          >
                            Download File
                          </a>
                        )}
                    </div>
                  )}
                </div>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const comment = e.target.comment.value;
                  const media = e.target.media.files[0];
                  handleComment(index, comment, media);
                  e.target.reset();
                }}
                className="space-y-2"
              >
                <Textarea name="comment" placeholder="Write a comment..." required />
                <Input
                  type="file"
                  name="media"
                  accept="image/*,video/*,application/pdf"
                />
                <Button type="submit" className="flex items-center gap-2">
                  <Upload size={16} /> Comment
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
