import { of } from 'rxjs';
import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let mockRoute: any;
  let mockHuishoudboekjeService: any;
  let mockAuthService: any;
  let mockUserService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockRoute = {
      params: of({ id: '123' })
    };
    mockHuishoudboekjeService = jasmine.createSpyObj(['readHuishoudboekje', 'updateHuishoudboekje']);
    mockAuthService = jasmine.createSpyObj(['user$']);
    mockUserService = jasmine.createSpyObj(['readAllUserExceptYourself']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    component = new EditComponent(
      mockRoute,
      mockHuishoudboekjeService,
      mockAuthService,
      mockUserService,
      mockRouter
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});