import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';

import { Landing } from './landing';
import { Trainer as TrainerService } from '../../services/trainer.service';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;
  let mockRouter: any;
  let mockTrainerService: any;

  beforeEach(async () => {
    // Create mocks
    mockRouter = {
      navigate: vi.fn()
    };
    
    mockTrainerService = {
      loadTrainerFromStorage: vi.fn().mockReturnValue(null),
      saveTrainerLocally: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: TrainerService, useValue: mockTrainerService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Landing);
    component = fixture.componentInstance;
    
    localStorage.clear();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display login form elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('h1')?.textContent).toContain('Pokémon Trainer Login');
    expect(compiled.querySelector('input')).toBeTruthy();
    expect(compiled.querySelector('button')?.textContent?.trim()).toBe('Login');
  });

  it('should navigate to catalogue when login button clicked with valid username', () => {
    component.username = 'Ash';
    
    const button = fixture.nativeElement.querySelector('button');
    button?.click();
    
    expect(mockTrainerService.saveTrainerLocally).toHaveBeenCalledWith('Ash');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/catalogue']);
  });

  it('should not navigate when login clicked with empty username', () => {
    component.username = '';
    
    const button = fixture.nativeElement.querySelector('button');
    button?.click();
    
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
