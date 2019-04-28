import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../posts/post.model";
import { PostService } from "../posts/post.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
  //  posts = [
  //   { title: "first Post ", content: "this is the first post content" },
  //   { title: "first Post ", content: "this is the first post content" },
  //   { title: "first Post ", content: "this is the first post content" },
  //   { title: "first Post ", content: "this is the first post content" }
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postServices: PostService) {}

  onDelete(postId: string) {
    this.postServices.deletePost(postId);
  }

  ngOnInit() {
    this.postServices.getPosts();
    this.postsSub = this.postServices
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }
  OnDestroy() {
    this.postsSub.unsubscribe();
  }
}
