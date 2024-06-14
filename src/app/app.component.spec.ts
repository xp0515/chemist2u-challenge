import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { SocketService } from './shared/services/socket.service';

const config: SocketIoConfig = { url: '54.90.121.83:3000', options: {} };

describe('AppComponent', () => {
  let service: SocketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, SocketIoModule.forRoot(config)],
      providers: [SocketService]
    }).compileComponents();
    service = TestBed.inject(SocketService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'chemist2u-challenge' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('chemist2u-challenge');
  });

});
