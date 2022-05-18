import * as petService from '../services/petService.js';

export const deleteView = (ctx) => {
    petService.remove(ctx.params.petId)
        .then(() => {
            ctx.page.redirect('/dashboard')
        })
}