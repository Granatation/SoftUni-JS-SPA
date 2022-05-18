import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as petService from '../services/petService.js';

export const petTemplate = (pet) => html `
    <div class="animals-board">
                    <article class="service-img">
                        <img class="animal-image-cover" src=${pet.image}>
                    </article>
                    <h2 class="name">${pet.name}</h2>
                    <h3 class="breed">${pet.breed}</h3>
                     <div class="action">
                        <a class="btn" href="/pets/${pet._id}">Details</a>
                    </div>
                 
                </div>
`;

const dashboardTemplate = (pets, user) => html `
 <!--Dashboard-->
 <section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard">
                
            ${pets.map(x=>petTemplate(x))}

            ${pets.length == 0
                ? html`<div>
                        <p class="no-pets">No pets in dashboard</p>
                        </div>`
                : nothing
            }
            </div>
        </section>
`;

export const dashboardView = (ctx) => {
    petService.getAll()
        .then(pets => {
            ctx.render(dashboardTemplate(pets,ctx.user));
        });
};