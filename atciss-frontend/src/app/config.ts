type FIR = {
  neighbourPrefixes: string[]
  neighbourFirs: string[]
  pages: { [name: string]: Page }
}
type Page = {
  staffingSectors: string[]
  statusSectors: string[][]
  majorAerodromes: string[]
  aerodromes: string[]
  relevantAerodromes: string[]
  areas: { [name: string]: string[] }
}
// TODO move to UI?
export const FIR_SETTINGS: { [name: string]: FIR } = {
  EDMM: {
    neighbourPrefixes: ["ED", "ET", "LK", "LO", "LS"],
    neighbourFirs: ["EDGG", "LKAA", "LOVV", "LSAS"],
    pages: {
      "ATIS APP": {
        staffingSectors: [
          "ed/SWA",
          "ed/ILR",
          "ed/ALB",
          "ed/RDG",
          "ed/EGG",
          "ed/NDG",
          "ed/WLD",
          "ed/ZUG",
          "ed/TEG",
          "ed/TRU",
          "ed/STA",
          "ed/FUE",
        ],
        statusSectors: [
          ["ed/NDG", "ed/WLD", "ed/SWA", "ed/ALB", "ed/RDG", "ed/EGG"],
          ["ed/DMNH", "ed/DMNL", "ed/DMND", "ed/DMSD", "ed/DMSL", "ed/DMSH"],
          ["ed/ILR", "ed/FUE", "ed/ZUG", "ed/STA", "ed/TEG", "ed/TRU"],
        ],
        majorAerodromes: ["EDDM"],
        aerodromes: ["ETSN", "ETSI", "ETHL", "ETSL", "EDMO", "EDMA", "EDJA"],
        relevantAerodromes: [],
        areas: {
          "ED-R107-407 Allgäu": [
            "ED-R107C",
            "ED-R107W",
            "ED-R207C",
            "ED-R207S",
            "ED-R207W",
            "ED-R307C",
            "ED-R307S",
            "ED-R407C",
            "ED-R407N",
            "ED-R407S",
          ],
          "ED-R137 Hohenfels": ["ED-R137A", "ED-R137B"],
          "ED-R144/170/171": ["ED-R144", "ED-R170A", "ED-R170B", "ED-R171"],
          "ED-R136 Grafenwöhr": ["ED-R136A", "ED-R136B", "ED-R136C"],
          "ED-R138 Siegenburg": ["ED-R138A", "ED-R138B"],
          "ED-R141 Altenstadt": ["ED-R141"],
          "ED-R147 Manching": ["ED-R147"],
        },
      },
      "ATIS NORD": {
        staffingSectors: [
          "ed/WLD",
          "ed/ALB",
          "ed/RDG",
          "ed/EGG",
          "ed/NDG",
          "ed/TEG",
          "ed/TRU",
          "ed/FUE",
          "ed/STA",
          "ed/SWA",
          "ed/BBG",
          "ed/HOF",
          "ed/FRK",
        ],
        statusSectors: [
          ["ed/ISA", "ed/DON", "ed/ALP", "ed/CHI"],
          ["ed/ALB", "ed/RDG", "ed/EGG", "ed/NDG", "ed/WLD", "ed/SWA"],
          ["ed/DMNH", "ed/DMNL", "ed/FUE", "ed/STA", "ed/TEG", "ed/TRU"],
          ["ed/HOF", "ed/BBG", "ed/FRK"],
        ],
        majorAerodromes: ["EDDM"],
        aerodromes: ["ETSN", "ETSI", "ETSL", "EDJA", "EDMA"],
        relevantAerodromes: ["EDDS", "EDDF"],
        areas: {
          "ED-R107-407 Allgäu": [
            "ED-R107C",
            "ED-R107W",
            "ED-R207C",
            "ED-R207S",
            "ED-R207W",
            "ED-R307C",
            "ED-R307S",
            "ED-R407C",
            "ED-R407N",
            "ED-R407S",
          ],
          "ED-R144/170/171": ["ED-R144", "ED-R170A", "ED-R170B", "ED-R171"],
          "ED-R136 Grafenwöhr": ["ED-R136A", "ED-R136B", "ED-R136C"],
          "ED-R138 Siegenburg": ["ED-R138A", "ED-R138B"],
          "ED-R137 Hohenfels": ["ED-R137A", "ED-R137B"],
          // "LK-TRA75": [
          //   "LK-TRA75"
          // ],
          "ED-R147 Manching": ["ED-R147"],
        },
      },
      "ATIS SUED": {
        staffingSectors: [
          "ed/SWA",
          "ed/ILR",
          "ed/WLD",
          "ed/NDG",
          "ed/EGG",
          "ed/ALB",
          "ed/ZUG",
          "ed/FUE",
          "ed/STA",
          "ed/TEG",
          "ed/TRU",
        ],
        statusSectors: [
          ["ed/ALP", "ed/CHI", "ed/ISA", "ed/DON"],
          ["ed/FUE", "ed/STA", "ed/TRU", "ed/NDG", "ed/ALB", "ed/EGG"],
          ["ed/ZUG", "ed/TEG", "ed/ILR", "ed/SWA", "ed/DMSH", "ed/DMSL"],
        ],
        majorAerodromes: ["EDDM"],
        aerodromes: ["EDMA", "ETSL", "ETHL", "EDJA", "EDMO"],
        relevantAerodromes: ["EDDS", "EDDF"],
        areas: {
          "ED-R107-407 Allgäu": [
            "ED-R107C",
            "ED-R107W",
            "ED-R207C",
            "ED-R207S",
            "ED-R207W",
            "ED-R307C",
            "ED-R307S",
            "ED-R407C",
            "ED-R407N",
            "ED-R407S",
          ],
          // M03: [],
          // Lizum: [],
          "ED-R141 Altenstadt": ["ED-R141"],
        },
      },
      "ATIS EDDN": {
        staffingSectors: [
          "ed/BBG",
          "ed/HOF",
          "ed/FRK",
          "ed/GER",
          "ed/MEI",
          "ed/TRS",
          "ed/ALB",
          "ed/RDG",
        ],
        statusSectors: [
          ["ed/DON", "ed/ERL", "ed/SAL", "ed/SPE", "ed/HVL"],
          ["ed/WUR", "ed/ALB", "ed/HOF", "ed/HAL", "ed/MEI", "ed/BOR"],
          ["ed/FUL", "ed/RDG", "ed/BBG", "ed/GER", "ed/SAS", "ed/FLG"],
          ["ed/GED", "ed/SWA", "ed/FRK", "ed/TRN", "ed/TRS", "ed/DBAS"],
          // LKAA, EPWW
        ],
        majorAerodromes: ["EDDN"],
        aerodromes: ["EDQC", "EDQA", "EDQM", "EDQD", "ETEB", "ETIC", "ETHN"],
        relevantAerodromes: [],
        areas: {
          "ED-R136": ["ED-R136A", "ED-R136B", "ED-R136C"],
          "ED-R137": ["ED-R137A", "ED-R137B"],
          "ED-R144/170/171": ["ED-R144", "ED-R170A", "ED-R170B", "ED-R171"],
          "ED-R208": ["ED-R208A", "ED-R208B"],
          "ED-R308": ["ED-R308"],
          "ED-R95A": ["ED-R95A"],
        },
      },
      "ATIS EDDP": {
        staffingSectors: [
          "ed/HAL",
          "ed/GER",
          "ed/MEI",
          "ed/TRN",
          "ed/TRS",
          "ed/SAS",
          "ed/BBG",
          "ed/HOF",
          "ed/FRK",
        ],
        statusSectors: [
          ["ed/SOL", "ed/ERL", "ed/SAL", "ed/SPE", "ed/HVL"],
          ["ed/HRZ", "ed/HOF", "ed/HAL", "ed/MEI", "ed/BOR"],
          ["ed/FUL", "ed/BBG", "ed/GER", "ed/SAS", "ed/FLG"],
          ["ed/GED", "ed/FRK", "ed/TRN", "ed/TRS", "ed/DBAS"],
          // LKAA, EPWW
        ],
        majorAerodromes: ["EDDP"],
        aerodromes: ["EDDC", "EDDE", "EDAB", "EDAC"],
        relevantAerodromes: [],
        areas: {
          "ED-R95A": ["ED-R95A"],
          "ED-R95B": ["ED-R95B"],
          "ED-R45": ["ED-R45"],
          "ED-R208": ["ED-R208A", "ED-R208B"],
          "ED-R308": ["ED-R308"],
        },
      },
      // TODO AFW, EBG-Ost
    },
  },
  EDGG: {
    neighbourPrefixes: ["ED", "ET", "EB", "EH", "EL", "LF", "LS"],
    neighbourFirs: ["EDMM", "EDWW", "EHAA", "EBBU", "LFEE", "LSAS"],
    pages: {
      // TODO: IRL different layout
      "ATIS EBG02": {
        staffingSectors: [
          "ed/BAD",
          "ed/MAN",
          "ed/LBU",
          "ed/NKRH",
          "ed/NKRL",
          "ed/KIR",
          "ed/SIG",
          "ed/KNG",
          "ed/TAU",
          "ed/GIN",
          "ed/PFA",
          "ed/DKB",
          "ed/REU",
          "ed/STG",
        ],
        statusSectors: [
          ["ed/BAD", "ed/MAN", "ed/LBU", "ed/NKRH", "ed/NKRL"],
          ["ed/GED", "ed/SIG", "ed/TAU", "ed/GIN", "ed/HEF"],
          ["ed/DKB", "ed/KTG", "ed/HAB", "ed/PSA", "ed/KNG"],
          ["ed/EIF", "ed/PFA", "ed/KIR", "ed/RUD"],
          ["ed/STG", "ed/REU"],
          ["ed/DFDN", "ed/DFDS", "ed/DFAN", "ed/DFAS"],
        ],
        majorAerodromes: ["EDDF", "EDDS"],
        aerodromes: ["ETAR", "EDFM"],
        relevantAerodromes: [],
        areas: {
          // Murgtal: [],
          "TRA 205": ["ED-R205A", "ED-R205B", "ED-R205C", "ED-R205D"],
          "TRA 207": ["ED-R207"],
          "ED-R 132 Heuberg": ["ED-R132A", "ED-R132B"],
        },
      },
      "ATIS EBG03": {
        staffingSectors: [
          "ed/GED",
          "ed/SIG",
          "ed/TAU",
          "ed/GIN",
          "ed/HEF",
          "ed/PADH",
          "ed/PADL",
          "ed/EIF",
          "ed/DUS",
          "ed/NOR",
          "ed/DKA",
          "ed/RUD",
          "ed/KIR",
          "ed/HAB",
        ],
        statusSectors: [
          ["ed/GED", "ed/SIG", "ed/TAU", "ed/GIN", "ed/HEF"],
          ["ed/DKB", "ed/KTG", "ed/HAB", "ed/PSA", "ed/KNG"],
          ["ed/BAD", "ed/MAN", "ed/LBU", "ed/NKRH", "ed/NKRL"],
          ["ed/EIF", "ed/PFA", "ed/KIR", "ed/RUD"],
          ["ed/STG", "ed/REU"],
          ["ed/DFDN", "ed/DFDS", "ed/DFAN", "ed/DFAS"],
        ],
        majorAerodromes: ["EDDF"],
        aerodromes: ["ETOU"],
        relevantAerodromes: [],
        areas: {
          "ED-R 134 Wildflecken": ["ED-R134"],
          "ED-R 135 Hammelburg": ["ED-R135A", "ED-R135B", "ED-R135C"],
          "ED-R 97 Schwarzenborn": ["ED-R97A", "ED-R97B"],
        },
      },
      // TODO: IRL different layout
      "ATIS EBG07": {
        staffingSectors: [
          "ed/DKA",
          "ed/NOR",
          "ed/PADL",
          "ed/PADH",
          "ed/BOT",
          "ed/DUS",
          "ed/EIF",
          "ed/TAU",
          "ed/SIG",
          "ed/RUD",
        ],
        statusSectors: [
          ["ed/DKA", "ed/NOR"],
          ["ed/PADL", "ed/PADH", "ed/BOT", "ed/DUS"],
        ],
        majorAerodromes: ["EDDK", "EDDL"],
        aerodromes: ["EDDG", "EDLV", "EDLW", "EDLP", "EDLN", "ETNN", "ETNG"],
        relevantAerodromes: [],
        areas: { "Eisenborn Areas": ["ED-R117"] },
      },
      // TODO: IRL different layout
      "ATIS EBG08": {
        staffingSectors: [
          "ed/STG",
          "ed/REU",
          "ed/BAD",
          "ed/LBU",
          "ed/NKRH",
          "ed/NKRL",
          "ed/KNG",
          "ed/DKB",
          "ed/PFA",
        ],
        statusSectors: [
          ["ed/STG", "ed/REU", "ed/BAD", "ed/LBU"],
          ["ed/NKRH", "ed/NKRL", "ed/KNG", "ed/DKB", "ed/PFA"],
        ],
        majorAerodromes: ["EDDS"],
        aerodromes: [],
        relevantAerodromes: [],
        areas: {
          "ED-R132": ["ED-R132A", "ED-R132B"],
          "ED-R205": ["ED-R205A", "ED-R205B", "ED-R205C", "ED-R205D"],
          "ED-R207": ["ED-R207C", "ED-R207S", "ED-R207W"],
        },
      },
    },
  },
}
export const FIR_TO_VATGLASSES: { [fir: string]: string } = {
  EDMM: "ed",
  EDUU: "ed",
  EDGG: "ed",
  EDWW: "ed",
  EDYY: "ed",
  EBBU: "eb-el",
  EHAA: "eh",
  EKDK: "ek",
  ESMM: "es",
  LIPP: "li",
  LKAA: "lk",
  LOVV: "lo",
  EPWW: "ep",
  LSAS: "ls",
}
