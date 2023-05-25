export class DestinoViaje {
    private selected: boolean;
    constructor(public n: string, public u: string) {
       this.selected = false;
    }
    isSelected(): boolean {
        return this.selected;
    }
    setSelected(s: boolean) {
        this.selected = s;
    }
}

