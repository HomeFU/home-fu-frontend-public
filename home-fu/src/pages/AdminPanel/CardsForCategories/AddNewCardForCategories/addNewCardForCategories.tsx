import style from "./addNewCardForCategories.module.scss";

export const AddNewCardForCategories = () => {
    return (
        <div>
            <form>
                <input type="text" placeholder="Enter name for card" />
                <input type="number" placeholder="Enter locatinId for card"/>
                <input type="text" placeholder="Enter locatin name for card"/>
                <div>
                    <span>Enter start date</span>
                    <input type="date"/>
                </div>
                <div>
                    <span>Enter end date</span>
                    <input type="date"/>
                </div>
                <input type="number" placeholder="Enter rating for card"/>
                <input type="number" placeholder="Enter price for card"/>
                <div>
                    <input type="checkbox" id="isDeleted" name="isDeleted" />
                    <label for="isDeleted">Deleted or not?</label>
                </div>
                <div>
                    <span>Select images</span>
                    <input type="file" />
                </div>
                <input type="number" placeholder="Enter ID for category"/>
                <button>Add new card</button>
            </form>
        </div>
    )
}