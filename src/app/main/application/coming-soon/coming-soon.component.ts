import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {

  public title: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.data.title || 'This page';
  }

}
