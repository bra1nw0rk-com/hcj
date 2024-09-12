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
        this.content = $(`
            <div class="input-items">
                <h2>Input items</h2>
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
            </div>
            <div class="button-items">
                <button>Button1</button>
                <input type="button">
                <input type="submit">
            </div>
            <div class="table-item">
                 <table>
                    <tr>
                        <th>Col1</th>
                        <th>col2</th>
                        <th>Col3</th>
                    </tr>
                    <tr>
                        <td>Col1_Val1</td>
                        <td>Col2_Val1</td>
                        <td>Col3_Val1</td>
                    </tr>
                    <tr>
                        <td>Col1_Val2</td>
                        <td>Col2_Val2</td>
                        <td>Col3_Val2</td>
                    </tr>
                </table> 
            </div>
            
		`);
        this.button.minimize();
        this.button.close();


    }

    init(){
        super.init()
    }




}
