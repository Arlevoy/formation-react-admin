import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Post } from "../entity/Post";

/**
 * Saves given post.
 */
export async function postSaveAction(request: Request, response: Response) {
  // get a post repository to perform operations with post
  const postRepository = getManager().getRepository(Post);
  console.log("request", request.params);
  console.log(
    "found : zzz",
    await postRepository.find({ id: request.params.id }),
  );

  const existingPosts = await postRepository.find({
    id: request.params.id,
  });

  // const existingPost = await postRepository.find({ id: request.params.id });

  // if (existingPost.length > 0){
  //   existingPost.update
  // }
  // create a real post object from post json object sent over http
  // const newPost = postRepository.create(request.body);

  // save received post

  const { id } = request.params;
  let post;
  if (id) {
    post = await postRepository.save({
      id: Number(request.params.id),
      ...request.body,
    });
  } else {
    post = await postRepository.save(request.body);
  }

  // return saved post back
  response.send(post);
}

export async function postDeleteAction(request: Request, response: Response) {
  const postRepository = getManager().getRepository(Post);
  await postRepository.delete(request.params.id);
  response.send();
}
