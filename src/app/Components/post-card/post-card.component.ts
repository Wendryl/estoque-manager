import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input('date')
  postDate?: string;

  @Input('author')
  postAuthor?: string;

  @Input('title')
  postTitle?: string;

  @Input('description')
  postDescription?: string;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToPost() {
    this._router.navigate(['/posts'])
  }

}
