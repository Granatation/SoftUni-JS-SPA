import page from '../node_modules/page/page.mjs';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { renderContentMiddleware, renderNavigationMiddleware } from './middlewares/renderMiddleware.js';
import { createView } from './views/createView.js';
import { dashboardView } from './views/dashboardView.js';
import { deleteView } from './views/deleteHandler.js';
import { detailView, donationView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { logoutView } from './views/logoutHandler.js';
import { registerView } from './views/registerView.js';

page(authMiddleware)
page(renderNavigationMiddleware);
page(renderContentMiddleware)

page('/', homeView)
page('/login', loginView)
page('/register', registerView)
page('/logout', logoutView)
page('/dashboard', dashboardView)
page('/create', createView)
page('/pets/:petId', detailView)
page('/pets/:petId/edit', editView)
page('/pets/:petId/delete', deleteView)
page('/pets/:petId/donate', donationView)

page.start()