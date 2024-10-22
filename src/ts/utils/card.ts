import { ITicket } from "../interface/ticket.interface";
import { workOrderDescription } from "./work-order-description";

export const createCard = (ticket: ITicket) => {

    const card =
        `
            <div class="card">
                <div class="card-line"></div>
                <div class="card-body">
                    <div class="dateAndActions">
                        <h3 id="textDay">Data: ${ticket.date} </h3>
                        <div class="card-actions">
                            <span class="btnCardEdit material-symbols-outlined edit-icon">
                                edit_note
                            </span>
                            <span class="btnCardDelete material-symbols-outlined delete-icon">
                                delete
                            </span>
                        </div>  
                    </div>
                    <p id="textCustomer">Edifício: ${ticket.customer}</p>
                    <p id="textMaintenanceOrCall">${workOrderDescription(ticket.workOrder)}</p>
                    <p id="textVrUsed">VT utilizado(s): ${ticket.vtUsed}</p>
                    <p class="getId">${ticket.id}</p>
                </div>
            </div>
           `;

    return card;
}




