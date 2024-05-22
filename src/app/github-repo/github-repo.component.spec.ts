import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch repositories', () => {
    const mockResponse = { items: [{ name: 'repo1' }, { name: 'repo2' }], total_count: 2 };

    service.getRepositories('username', 10, 1).subscribe(repos => {
      expect(repos).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://api.github.com/search/repositories?q=user:username&per_page=10&page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
