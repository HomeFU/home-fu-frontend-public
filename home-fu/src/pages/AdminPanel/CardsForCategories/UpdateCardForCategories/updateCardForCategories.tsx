import style from "./updateCardForCategories.module.scss";

export const UpadteCardForCategories = () => {
    return (
        <div>
            <form>
                <input type="text" placeholder="Enter new name for card" />
                <input type="number" placeholder="Enter new locatinId for card"/>
                <input type="text" placeholder="Enter new locatin name for card"/>
                <div>
                    <span>Enter new start date</span>
                    <input type="date"/>
                </div>
                <div>
                    <span>Enter new end date</span>
                    <input type="date"/>
                </div>
                <input type="number" placeholder="Enter new rating for card"/>
                <input type="number" placeholder="Enter new price for card"/>
                <div>
                    <input type="checkbox" id="isDeleted" name="isDeleted" />
                    <label for="isDeleted">Deleted or not?</label>
                </div>
                <div>
                    <span>Select images</span>
                    <input type="file" />
                </div>
                <input type="number" placeholder="Enter new ID for category"/>
                <button>Add new card</button>
            </form>
        </div>
    )
}