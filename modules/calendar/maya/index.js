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
            <div id="mayan-date"></div>
		`);
        this.init();
    }
    init() {
        function calculateMayanDate() {
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

            // Format the Long Count date
            const mayanDate = `${baktun}.${katun}.${tun}.${uinal}.${kin}`;

            // Display the date
            $(`#mayan-date`).html(mayanDate);
        }

        // Update the date every second
        setInterval(calculateMayanDate, 1000);
        calculateMayanDate();
    }


}
