import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GithubRepoComponent } from './github-repo.component';
import { GithubService } from '../github.service';
import { of } from 'rxjs';

describe('GithubRepoComponent', () => {
  let component: GithubRepoComponent;
  let fixture: ComponentFixture<GithubRepoComponent>;
  let githubService: jasmine.SpyObj<GithubService>;

  beforeEach(async () => {
    const githubServiceSpy = jasmine.createSpyObj('GithubService', ['getRepositories']);
    await TestBed.configureTestingModule({
      declarations: [GithubRepoComponent],
      providers: [{ provide: GithubService, useValue: githubServiceSpy }]
    }).compileComponents();

    githubService = TestBed.inject(GithubService) as jasmine.SpyObj<GithubService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubRepoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch repositories on ngOnInit', fakeAsync(() => {
    const mockResponse = { items: [{ name: 'repo1' }, { name: 'repo2' }], total_count: 2 };
    githubService.getRepositories.and.returnValue(of(mockResponse));

    fixture.detectChanges();
    tick();

    expect(component.repos).toEqual(mockResponse.items);
  }));

  it('should fetch repositories when searching', fakeAsync(() => {
    const mockResponse = { items: [{ name: 'repo1' }, { name: 'repo2' }], total_count: 2 };
    githubService.getRepositories.and.returnValue(of(mockResponse));

    component.username = 'username';
    component.searchRepos();
    tick();

    expect(component.repos).toEqual(mockResponse.items);
  }));
});
