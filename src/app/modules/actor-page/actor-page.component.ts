import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { SearchListMoviesComponent } from '../../shared/components/search-list-movies/search-list-movies.component';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../core/services/tmdb.service';
import { Genre } from '../../shared/models/genre.model';

@Component({
  selector: 'app-actor-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SearchListMoviesComponent,
  ],
  templateUrl: './actor-page.component.html'
})
export class ActorPageComponent implements OnInit{
  protected actor: any;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const actorId = +params['id'];
      this.loadActor(actorId);
    });
  }

  loadActor(actorId: number): void {
    this.tmdbService.getActorById(actorId).subscribe(
      (response: any) => {
        this.actor = response;
        console.log('Actor:', this.actor);
      },
      (error: any) => {
        console.error('Error fetching actor details:', error);
      }
    );
  }

}
