import Box from "../../../js/lib/html/Box.js";

/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
export default class ItemsDemo extends Box {
    constructor() {
        super(true);
        let _this = this;
        this.css = "/modules/demo/items/index.css";
        this.title = "Items list";
        this.draggable = true;
        this.resizable = true;
        this.name ="itemsDemo"
        this.icon.set("fa-object-ungroup")

        this.content.row().group({
            title: "Table",
            content: $(`
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>date</th>
                            <th>role</th>
                            <th>age</th>
                            <th>email</th>
                            <th>language</th>
                            <th>h</th>
                            <th>i</th>
                            <th>j</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        <tr>
                            <td>1</td>
                            <td>John</td>
                            <td>01.02.2023</td>
                            <td>admin</td>
                            <td>35</td>
                            <td>john@example.com</td>
                            <td>English</td>
                            <td>8</td>
                            <td>9</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Bob</td>
                            <td>02.03.2024</td>
                            <td>moderator</td>
                            <td>25</td>
                            <td>bob@example.com</td>
                            <td>Czech</td>
                            <td>8</td>
                            <td>9</td>
                            <td>10</td>
                        </tr>
                    </tbody>
                </table> 
            `)
        })
        /*
        this.content.row().group({
            title: "Buttons",
            content: $(`
                <button class="ok">ok</button>
                <button class="cancel">cancel</button>
            `)
        })
        this.content.row().group({
            title:"Input items",
            content:$(`
                <label>Text input <input type="text" name="item_input_text"></label>
                <label><input type="checkbox" name="item_checkbox"> Checkbox</label>
                <label><input type="radio" name="item_radio"> Radio</label>
                <label>Select: 
                    <select name="item_select" id="select0">
                        <option value="value1">Value 1</option>
                        <option value="value2">Value 2</option>
                        <option value="value3">Value 3</option>
                        <option value="value4">Value 4</option>
                    </select>
                </label>
                <!--
                <label> Textarea:
                    <textarea id="textarea0" name="item_textarea" rows="4" cols="50">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </textarea>
                </label>
                
                <input type="color">
                <input type="date">
                <input type="datetime-local">
                <input type="email">
                <input type="file">                
                <input type="image">
                <input type="month">
                <input type="number">
                <input type="password">                
                <input type="range">
                <input type="reset">
                <input type="search">                
                <input type="tel">                
                <input type="time">
                <input type="url">
                <input type="week">
                -->  
            `)
        })

         */
        this.button.minimize();
        this.button.close();



    }

    init(){
        super.init()
    }




}
