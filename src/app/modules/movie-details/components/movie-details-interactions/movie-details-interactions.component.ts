import { Component, Input, OnInit } from '@angular/core';
import { StarsComponent } from '../../../../shared/components/stars/stars.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { RatingsGraphComponent } from '../../../../shared/components/ratings-graph/ratings-graph.component';
import { IMovie } from '../../../../shared/models/movie.model';
import { UserService } from '../../../../core/services/user.service';

@Component({
    selector: 'app-movie-details-interactions',
    standalone: true,
    imports: [StarsComponent, TablerIconsModule, RatingsGraphComponent],
    templateUrl: './movie-details-interactions.component.html'
})
export class MovieDetailsInteractionsComponent implements OnInit {
    @Input() public reviews: any[] = [];
    @Input() public movie: IMovie = {} as IMovie;

    protected watchlist: number[] = [];

    constructor(private userService: UserService) {}

    public async ngOnInit(): Promise<void> {}

    protected isWatchlisted(movieId: number): boolean {
        return this.watchlist.includes(movieId);
    }

    /**
     * Add a movie to the watchlist if it's not already there, remove it if it is
     * @param movie {IMovie} - The movie id
     */
    protected async toggleWatchlist(movie: IMovie): Promise<void> {
        if (this.isWatchlisted(movie?.id)) {
            this.watchlist = this.watchlist.filter((id) => id !== movie?.id);
            await this.userService.removeWatchlist(movie);
        } else {
            this.watchlist = [...this.watchlist, movie?.id];
            await this.userService.addWatchlist(movie);
        }
    }
}
