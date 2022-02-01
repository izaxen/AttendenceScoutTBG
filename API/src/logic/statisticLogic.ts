import { statisticRepo } from'../repositories/statisticRepositories'


async function getStatisticReport() {
 return statisticRepo.getStatisticReportAllUnits() 
}

async function getStatisticPresens() {
  return statisticRepo.getStatisticPresensAllUnits()
}



export const statisticLogic = {getStatisticPresens, getStatisticReport}