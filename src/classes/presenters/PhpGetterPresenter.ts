import PhpTypePresenter from "@/classes/presenters/PhpTypePresenter";
import Settings from "@/classes/dto/Settings";
import Str from "@/classes/support/Str";
import PhpDocblockPresenter from "@/classes/presenters/PhpDocblockPresenter";

export default class PhpGetterPresenter {
    private readonly typePresenter: PhpTypePresenter;
    private readonly settings: Settings;

    public constructor(type: PhpTypePresenter, settings: Settings) {
        this.typePresenter = type;
        this.settings = settings;
    }

    public toString(): string {
        let content = '';

        content += (new PhpDocblockPresenter(this.settings, [], this.typePresenter.getPhpTypeNotation())).toString();

        content += '\tpublic function '
            + Str.changeCase('get_' + this.typePresenter.getPhpVarName(), this.settings.getterCase)
            + '(): ' + this.typePresenter.getPhpTypeNotation() + '\n';

        content += '\t{\n';
        content += '\t\treturn $this->' + this.typePresenter.getPhpVarName() + ';\n';
        content += '\t}\n';

        return content;
    }
}