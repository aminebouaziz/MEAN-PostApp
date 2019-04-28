import { Component, EventEmitter } from "@angular/core";
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";

import { PostService } from "../post.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create-components.css"]
})
export class PostCreateComponent {
  enteredContent = "";
  enteredTitle = "";
  postCreated = new EventEmitter<Post>();

  constructor(public postServices: PostService) {}
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.postServices.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
