export class DestinoViaje {
    private selected: boolean;
    public servicios: string[];
    constructor(public n: string, public u: string) {
       this.selected = false;
       this.servicios = ['desayuno','almuerzo'];
    }
    isSelected(): boolean {
        return this.selected;
    }
    setSelected(s: boolean) {
        this.selected = s;
    }
}

