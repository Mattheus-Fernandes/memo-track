import { ITicket } from "../interface/ticket.interface";
import { workOrderDescription } from "./work-order-description";

export const createCard = (ticket: ITicket) => {

    const card =
        `
            <div class="contentHub__card">
                <div class="contentHub__card-line"></div>
                <div class="contentHub__card-body">
                    <div class="contentHub__date-actions">
                        <h3 id="textDay" class="contentHub__day">Data: ${ticket.date} </h3>
                        <div class="contentHub__card-actions">
                            <span class="contentHub__btn-edit card-btn material-symbols-outlined">
                                edit_note
                            </span>
                            <span class="contentHub__btn-delete card-btn material-symbols-outlined">
                                delete
                            </span>
                        </div>  
                    </div>
                    <p id="textCustomer">Edifício: ${ticket.customer}</p>
                    <p id="textMaintenanceOrCall"">${workOrderDescription(ticket.workOrder)}</p>
                    <p id="textVrUsed">VT utilizado(s): ${ticket.vtUsed}</p>
                    <p class="contentHub__get-id">${ticket.id}</p>
                </div>
            </div>
           `;

    return card;
}




