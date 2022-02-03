import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class PCFBootstrapCards implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private notifyOutputChanged: () => void;
	private container: HTMLDivElement;

	/**
	 * Empty constructor.
	 */
	constructor() {

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
		// Add control initialization code
		//Bootstrap.hasOwnProperty("test");

		this.notifyOutputChanged = notifyOutputChanged;
		this.container = container;
		this.notifyOutputChanged();
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		// Add code to update control view
		this.container.innerHTML = "";
		this.container.classList.add("overflow-auto");

		let section = document.createElement("div");
		section.classList.add("page-contain");

		/** Card Layout
		 * ------------------------------
		 * |     col0    |     col1     |
		 * |----------------------------|
		 * |			col2			|
		 * |			col3			|
		 * |----------------------------|
		 * |     col4    |     col5     |  
		 * |----------------------------|		 
		 */

		context.parameters.entityDataSet.sortedRecordIds.forEach((recordid) => {
			let currentRecord = context.parameters.entityDataSet.records[recordid];

			//forEach
			let card = document.createElement("div");
			card.classList.add("card");

			let action = document.createElement("div");
			action.classList.add("data-card");

			//header
			let header = document.createElement("div");
			header.classList.add("row", "header");

			//col0
			let col0 = document.createElement("div");
			col0.classList.add("col-6", "text-left");
			//col1
			let col1 = document.createElement("div");
			col1.classList.add("col-6", "text-right");

			//body
			let body = document.createElement("div");
			body.classList.add("row", "body");

			//col2
			let col2 = document.createElement("div");
			col2.classList.add("col", "h3", "text-left");

			//col3
			let col3 = document.createElement("div");
			col3.classList.add("col", "p", "text-left");

			//footer
			let footer = document.createElement("div");
			footer.classList.add("row", "footer");

			//col4
			let col4 = document.createElement("div");
			col4.classList.add("col-6", "text-left");

			//col5
			let col5 = document.createElement("div");
			col5.classList.add("col-6", "text-right");
			
			//indicator
			let indicator = document.createElement("span");
			let statusColor = "bg-light";


			context.parameters.entityDataSet.columns.forEach((column: DataSetInterfaces.Column) => {

				if (Object.values(context.parameters.entityDataSet.records).length > 0) {
										
					let elem = document.createElement("div");
					elem.id = "data" + column.order;
					console.log(column.name + ":" + currentRecord.getValue(column.name));
					console.log(column.dataType);
					
					if (currentRecord.getValue(column.name) != null) {
					
					// Create Entity Reference
					let recordEntityReferece = currentRecord.getNamedReference();
					
					let pageInput: any = {
						pageType: "entityrecord",
						entityName: context.parameters.entityDataSet.getTargetEntityType(),
						entityId: recordEntityReferece.id
					};
					let navigationOptions: any = {
						target: 2,
						height: {value: 80, unit:"%"},
						width: {value: 70, unit:"%"},
						position: 1
					};
					// Create function to open record
					let openRecord =() => {     
						Xrm.Navigation.navigateTo(pageInput, navigationOptions);
					}

						let formattedValue = currentRecord.getFormattedValue(column.name);
						// If the field is an image, show the image
						if (formattedValue.endsWith("jpg") || formattedValue.endsWith("gif") || formattedValue.endsWith("png") || formattedValue.endsWith("jpeg")
						) {
							let image: HTMLImageElement = document.createElement("img");
							image.classList.add("img-fluid");
							image.src = currentRecord.getFormattedValue(column.name);
							elem.appendChild(image);
						} else {
							elem.innerHTML = currentRecord.getFormattedValue(column.name);
						}
						//indicator
						if (column.name != null) {
							switch (formattedValue) {
								case "bg-warning":
									statusColor = "bg-warning";
									break;
								case "bg-dark":
									statusColor = "bg-dark";
									break;
								case "bg-success":
									statusColor = "bg-success";
									break;
								case "bg-info":
									statusColor = "bg-info";
									break;
								case "bg-primary":
									statusColor = "bg-primary";
									break;
								case "bg-danger":
									statusColor = "bg-danger";
									break;	
								case "bg-secondary":
									statusColor = "bg-secondary";
									break;									
								default:
									break;
							}							
						}

						//indicator
						indicator.className = statusColor;
						indicator.classList.add("beacon");
						indicator.innerHTML = "";

						switch (column.order) {
							case 0:
								elem.classList.add("card-header-text", "h4", "clip-overflow");
								col0.appendChild(elem);
								break;
							case 1:
								elem.classList.add("card-header-text", "h4", "clip-overflow");
								col1.appendChild(elem);
								break;
							case 2:
								elem.classList.add("card-title", "clip-overflow");
								// Add event listener to onClick event of card 
								elem.addEventListener("click", openRecord);
								col2.appendChild(elem);
								break;
							case 3:
								elem.classList.add("card-text");
								col3.appendChild(elem);
								break;
							case 4:
								elem.classList.add("card-footer-text", "text-muted", "h4", "clip-overflow");
								col4.appendChild(elem);
								break;
							case 5:
								elem.classList.add("card-footer-text", "text-muted", "h4", "clip-overflow");
								col5.appendChild(elem);
								break;
							default:
								break;
						}
					}
					header.appendChild(indicator);
					header.appendChild(col0);
					header.appendChild(col1);
					body.appendChild(col2);
					body.appendChild(col3);
					footer.appendChild(col4);
					footer.appendChild(col5);

					action.appendChild(header);
					action.appendChild(body);
					action.appendChild(footer);
					
					card.appendChild(action);

				}
			});
			section.appendChild(card);

		});
		this.container.appendChild(section);
		this.notifyOutputChanged();
	}

	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {};
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}

	/** Button Event handler for the button created as part of this control
	* @param event
	*/
}
