import { DataTablesApi } from 'datatables.net'; // ตัวอย่าง (ขึ้นกับไลบรารี)
import Dropzone from 'dropzone';

declare global {
    interface Window {
        _: typeof import("lodash");
        $: typeof import("jquery");
        jQuery: typeof import("jquery");
        DataTable: DataTablesApi;  // แก้ให้เป็น type จริงของ datatables
        Dropzone: typeof Dropzone;
        noUiSlider: typeof import("nouislider");

        HSStaticMethods: IStaticMethods;
    }
}
