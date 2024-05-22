import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-github-repo',
  templateUrl: './github-repo.component.html',
  styleUrls: ['./github-repo.component.scss']
})
export class GithubRepoComponent implements OnInit {
  username: string = '';
  repos: any[] = [];
  loading: boolean = false;
  userNotFound: boolean = false;
  errorMessage: string = '';
  pageSize: number = 10; // Default page size
  pageSizes: number[] = [10, 25, 50, 100]; // Options for page size dropdown
  currentPage: number = 1; // Current page
  totalPages: number = 0; // Total number of pages

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    // Fetch repositories for the initial page load
    this.fetchRepositories();
  }

  fetchRepositories(): void {
    this.loading = true;
    this.githubService.getRepositories(this.username, this.pageSize, this.currentPage)
      .subscribe(
        (response: any) => {
          this.repos = response.items;
          this.totalPages = Math.ceil(response.total_count / this.pageSize);
          this.loading = false;
          this.userNotFound = false;
          this.errorMessage = '';
        },
        (error: any) => {
          this.loading = false;
          if (error.status === 404) {
            this.userNotFound = true;
            this.errorMessage = `No repositories found for user "${this.username}".`;
          } else {
            this.errorMessage = 'An error occurred while fetching repositories.';
          }
        }
      );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchRepositories();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchRepositories();
    }
  }

  searchRepos(): void {
    if (this.username.trim() === '') {
      this.repos = [];
      this.userNotFound = false;
      this.errorMessage = '';
      return;
    }
    this.currentPage = 1; // Reset current page when searching
    this.fetchRepositories();
  }
}
