import { workOrderEnum } from "../enums/work-order.enum"

export const workOrderDescription = (value: number): string => {

    const descriptions: {[key in workOrderEnum]: string} = {
        [workOrderEnum.MANUTENCAO]: 'Manutenção',
        [workOrderEnum.CHAMADO]: 'Chamado',
        [workOrderEnum.SERVICO]: 'Serviço',
        [workOrderEnum.OUTROS]: 'Outros'
    }

    return descriptions[value as workOrderEnum] 

}