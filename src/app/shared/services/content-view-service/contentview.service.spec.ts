import { TestBed } from '@angular/core/testing';

import { ContentviewService } from './contentview.service';

describe('ContentviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentviewService = TestBed.get(ContentviewService);
    expect(service).toBeTruthy();
  });
});
