import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as petService from '../services/petService.js';

const detailsTemplate = (pet, user, donation, donationsFromAUser) => html `
<!--Details Page-->
<section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${pet.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: ${donation}$</h4>
                    </div>
                     <!-- Only for registered user and creator of the album-->
                    ${user && user._id == pet._ownerId
                        ? html`<div class="actionBtn">
                                    <!-- Only for registered user and creator of the pets-->
                                    <a href="/pets/${pet._id}/edit" class="edit">Edit</a>
                                    <a href="/pets/${pet._id}/delete" class="remove">Delete</a>
                                </div>`
                        : nothing
                    }

                    ${user && user._id != pet._ownerId && donationsFromAUser == 0
                        ? html`<div class="actionBtn">
                                    <!--(Bonus Part) Only for no creator and user-->
                                    <a href="/pets/${pet._id}/donate" id=${pet._id} class="donate">Donate</a>
                                </div>`
                        : nothing
                    }
                </div>
            </div>
        </section>`;

export const detailView = async(ctx) => {
    const donationsCount = await petService.getAllDonations(ctx.params.petId)
        .then(donations=>donations)

    const donations=donationsCount*100

    const donationsFromAUser=await petService.getAllDonationsFromAUser(ctx.params.petId, ctx.user._id)
            .then(donations=>donations)

    petService.getOne(ctx.params.petId)
        .then(pet => {
            ctx.render(detailsTemplate(pet, ctx.user, donations,donationsFromAUser))
        });
};

export const donationView = async(ctx) => {
    petService.makeDonation({petId:ctx.params.petId})
        .then(pet=>console.log(pet))

    const donationsCount = await petService.getAllDonations(ctx.params.petId)
        .then(donations=>donations)

        const donationsFromAUser=await petService.getAllDonationsFromAUser(ctx.params.petId, ctx.user._id)
            .then(donations=>donations)
            
    
    const donations=donationsCount * 100

    petService.getOne(ctx.params.petId)
    .then(pet => {
        const aTag=document.getElementById(ctx.params.petId)
        aTag.style.display='none'

        ctx.render(detailsTemplate(pet, ctx.user, donations, donationsFromAUser))
    });
}