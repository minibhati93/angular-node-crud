import { TestBed } from '@angular/core/testing';

import { ManageBooksService } from './manage-books.service';

describe('ManageBooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageBooksService = TestBed.get(ManageBooksService);
    expect(service).toBeTruthy();
  });
});
