import { Component, EventEmitter, OnInit } from "@angular/core";
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";

import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create-components.css"]
})
export class PostCreateComponent implements OnInit {
  enteredContent = "";
  enteredTitle = "";
  post: Post;
  isloading = false;
  private mode = "create";
  private postId: string;

  //postCreated = new EventEmitter<Post>();

  constructor(public postServices: PostService, public route: ActivatedRoute) {}

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.postServices.addPost(form.value.title, form.value.content);
    } else {
      this.postServices.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }

    form.resetForm();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isloading = true;
        this.postServices.getPost(this.postId).subscribe(postData => {
          this.isloading = false;

          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }
}
