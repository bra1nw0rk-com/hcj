import Module from "../../../js/lib/core/Module.js";
import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class CalendarMaya extends HTMLObject {
    constructor() {
        super("menu");
        let _this = this;
        this.css = "/modules/calendar/maya/index.css";
        this.id = "calendar-maya";
        this.classes = "calendar-maya";
        this.template = $(html`
            <div>
                <div>Haabʼ: <div id="mayan-haab-date"></div></div>
                <div>Tzolkʼin: <div id="mayan-tzolkin-date"></div></div>
            </div>
                
		`);
        this.init();
    }
    init() {
        const tzolkinNames = [
            'Imix', 'Ik', 'Akbal', 'Kan', 'Chicchan', 'Cimi', 'Manik', 'Lamat', 'Muluc', 'Oc',
            'Chuen', 'Eb', 'Ben', 'Ix', 'Men', 'Cib', 'Caban', 'Etznab', 'Cauac', 'Ahau'
        ];
        function calculateMayanDates() {
            // Date of the start of the Mayan Long Count (11 August 3114 BC)
            const mayanEpoch = new Date(Date.UTC(-3113, 7, 11));

            // Current date
            const currentDate = new Date();

            // Calculate the difference in days
            const diffTime = Math.abs(currentDate - mayanEpoch);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            // Calculate Mayan Long Count
            let remainingDays = diffDays;
            const baktun = Math.floor(remainingDays / 144000);
            remainingDays %= 144000;
            const katun = Math.floor(remainingDays / 7200);
            remainingDays %= 7200;
            const tun = Math.floor(remainingDays / 360);
            remainingDays %= 360;
            const uinal = Math.floor(remainingDays / 20);
            const kin = remainingDays % 20;

            const mayanLongCount = `${baktun}.${katun}.${tun}.${uinal}.${kin}`;
            $(`#mayan-haab-date`).html(mayanLongCount);

            // Calculate Tzolk'in Date
            const tzolkinNumber = (diffDays % 13) + 1;
            const tzolkinName = tzolkinNames[diffDays % 20];

            const tzolkinDate = `${tzolkinNumber} ${tzolkinName}`;
            $(`#mayan-tzolkin-date`).html(tzolkinDate);
        }

        // Update the date every second
        setInterval(calculateMayanDates, 1000);
        calculateMayanDates();
    }


}
