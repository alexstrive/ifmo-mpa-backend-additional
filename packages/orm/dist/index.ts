var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define("sequelize", ["require", "exports", "sequelize-typescript"], function (require, exports, sequelize_typescript_1) {
    "use strict";
    exports.__esModule = true;
    var sequelize = new sequelize_typescript_1.Sequelize("postgres://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_DOMAIN + ":" + process.env.DB_PORT + "/" + process.env.DB_DATABASE, { logging: false, models: [__dirname + '/models'] });
    // sequelize.query('DROP TYPE enum_disease_contradictions_level')
    exports["default"] = sequelize;
});
define("index", ["require", "exports", "sequelize"], function (require, exports, sequelize_1) {
    "use strict";
    exports.__esModule = true;
    var fastify = require('fastify');
    var fastifyPlugin = require('fastify-plugin');
    var ORM = function (fastify, options) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sequelize_1["default"].sync()];
                case 1:
                    _a.sent();
                    fastify.decorate('sequelize', sequelize_1["default"]);
                    return [2 /*return*/];
            }
        });
    }); };
    exports["default"] = fastifyPlugin(ORM);
});
define("models/Medicine", ["require", "exports", "sequelize-typescript", "models/ActiveSubstanceInMedicine"], function (require, exports, sequelize_typescript_2, ActiveSubstanceInMedicine_1) {
    "use strict";
    exports.__esModule = true;
    var Medicine = /** @class */ (function (_super) {
        __extends(Medicine, _super);
        function Medicine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            sequelize_typescript_2.Column,
            __metadata("design:type", String)
        ], Medicine.prototype, "name");
        __decorate([
            sequelize_typescript_2.HasMany(function () { return ActiveSubstanceInMedicine_1["default"]; }, 'medicine_id'),
            __metadata("design:type", ActiveSubstanceInMedicine_1["default"])
        ], Medicine.prototype, "substances");
        Medicine = __decorate([
            sequelize_typescript_2.Table({ tableName: 'medicine', timestamps: false })
        ], Medicine);
        return Medicine;
    }(sequelize_typescript_2.Model));
    exports["default"] = Medicine;
});
define("models/Substance", ["require", "exports", "sequelize-typescript"], function (require, exports, sequelize_typescript_3) {
    "use strict";
    exports.__esModule = true;
    var Substance = /** @class */ (function (_super) {
        __extends(Substance, _super);
        function Substance() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            sequelize_typescript_3.PrimaryKey,
            sequelize_typescript_3.AutoIncrement,
            sequelize_typescript_3.Column,
            __metadata("design:type", Number)
        ], Substance.prototype, "id");
        __decorate([
            sequelize_typescript_3.Column,
            __metadata("design:type", String)
        ], Substance.prototype, "name");
        Substance = __decorate([
            sequelize_typescript_3.Table({ tableName: 'active_substance', timestamps: false })
        ], Substance);
        return Substance;
    }(sequelize_typescript_3.Model));
    exports["default"] = Substance;
});
define("models/ActiveSubstanceInMedicine", ["require", "exports", "sequelize-typescript", "models/Medicine", "models/Substance"], function (require, exports, sequelize_typescript_4, Medicine_1, Substance_1) {
    "use strict";
    exports.__esModule = true;
    var ActiveSubstanceInMedicine = /** @class */ (function (_super) {
        __extends(ActiveSubstanceInMedicine, _super);
        function ActiveSubstanceInMedicine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            sequelize_typescript_4.Column,
            __metadata("design:type", Number)
        ], ActiveSubstanceInMedicine.prototype, "active_substance_id");
        __decorate([
            sequelize_typescript_4.Column,
            __metadata("design:type", Number)
        ], ActiveSubstanceInMedicine.prototype, "medicine_id");
        __decorate([
            sequelize_typescript_4.BelongsTo(function () { return Medicine_1["default"]; }, 'medicine_id'),
            __metadata("design:type", Medicine_1["default"])
        ], ActiveSubstanceInMedicine.prototype, "medicine");
        __decorate([
            sequelize_typescript_4.BelongsTo(function () { return Substance_1["default"]; }, 'active_substance_id'),
            __metadata("design:type", Substance_1["default"])
        ], ActiveSubstanceInMedicine.prototype, "substance");
        ActiveSubstanceInMedicine = __decorate([
            sequelize_typescript_4.Table({ tableName: 'active_substance_in_medicine', timestamps: false })
        ], ActiveSubstanceInMedicine);
        return ActiveSubstanceInMedicine;
    }(sequelize_typescript_4.Model));
    exports["default"] = ActiveSubstanceInMedicine;
});
define("models/Disease", ["require", "exports", "sequelize-typescript"], function (require, exports, sequelize_typescript_5) {
    "use strict";
    exports.__esModule = true;
    var Disease = /** @class */ (function (_super) {
        __extends(Disease, _super);
        function Disease() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            sequelize_typescript_5.PrimaryKey,
            sequelize_typescript_5.Column(sequelize_typescript_5.DataType.INTEGER),
            __metadata("design:type", Number)
        ], Disease.prototype, "id");
        __decorate([
            sequelize_typescript_5.Column,
            __metadata("design:type", String)
        ], Disease.prototype, "name");
        Disease = __decorate([
            sequelize_typescript_5.Table({
                tableName: 'disease',
                timestamps: false
            })
        ], Disease);
        return Disease;
    }(sequelize_typescript_5.Model));
    exports["default"] = Disease;
});
define("models/PatientContradictions", ["require", "exports", "sequelize-typescript", "models/Patient", "models/Substance"], function (require, exports, sequelize_typescript_6, Patient_1, Substance_2) {
    "use strict";
    exports.__esModule = true;
    var PatientContradictions = /** @class */ (function (_super) {
        __extends(PatientContradictions, _super);
        function PatientContradictions() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            sequelize_typescript_6.AutoIncrement,
            sequelize_typescript_6.Column,
            __metadata("design:type", Number)
        ], PatientContradictions.prototype, "id");
        __decorate([
            sequelize_typescript_6.BelongsTo(function () { return Patient_1["default"]; }, 'patientId'),
            __metadata("design:type", Patient_1["default"])
        ], PatientContradictions.prototype, "patient");
        __decorate([
            sequelize_typescript_6.PrimaryKey,
            sequelize_typescript_6.Index,
            sequelize_typescript_6.ForeignKey(function () { return Patient_1["default"]; }),
            sequelize_typescript_6.Column,
            __metadata("design:type", Number)
        ], PatientContradictions.prototype, "patientId");
        __decorate([
            sequelize_typescript_6.PrimaryKey,
            sequelize_typescript_6.Default('OTHER'),
            sequelize_typescript_6.Column(sequelize_typescript_6.DataType.ENUM('OTHER', 'SUBSTANCE', 'DISEASE')),
            __metadata("design:type", String)
        ], PatientContradictions.prototype, "reasonType");
        __decorate([
            sequelize_typescript_6.PrimaryKey,
            sequelize_typescript_6.Column,
            __metadata("design:type", Number)
        ], PatientContradictions.prototype, "reasonId");
        __decorate([
            sequelize_typescript_6.Default('LIGHT'),
            sequelize_typescript_6.Column(sequelize_typescript_6.DataType.ENUM('LIGHT', 'AVERAGE', 'HIGH')),
            __metadata("design:type", String)
        ], PatientContradictions.prototype, "level");
        __decorate([
            sequelize_typescript_6.BelongsTo(function () { return Substance_2["default"]; }, 'substanceId'),
            __metadata("design:type", Substance_2["default"])
        ], PatientContradictions.prototype, "substance");
        __decorate([
            sequelize_typescript_6.PrimaryKey,
            sequelize_typescript_6.ForeignKey(function () { return Substance_2["default"]; }),
            sequelize_typescript_6.Column,
            __metadata("design:type", Number)
        ], PatientContradictions.prototype, "substanceId");
        PatientContradictions = __decorate([
            sequelize_typescript_6.Table({
                tableName: 'patient_contradictions'
            })
        ], PatientContradictions);
        return PatientContradictions;
    }(sequelize_typescript_6.Model));
    exports["default"] = PatientContradictions;
});
define("models/Prescription", ["require", "exports", "sequelize-typescript"], function (require, exports, sequelize_typescript_7) {
    "use strict";
    exports.__esModule = true;
    var Prescription = /** @class */ (function (_super) {
        __extends(Prescription, _super);
        function Prescription() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            sequelize_typescript_7.Column,
            __metadata("design:type", Number)
        ], Prescription.prototype, "status_id");
        __decorate([
            sequelize_typescript_7.Column,
            __metadata("design:type", Number)
        ], Prescription.prototype, "medicine_id");
        Prescription = __decorate([
            sequelize_typescript_7.Table({ tableName: 'prescription', timestamps: false })
        ], Prescription);
        return Prescription;
    }(sequelize_typescript_7.Model));
    exports["default"] = Prescription;
});
define("models/Status", ["require", "exports", "sequelize-typescript", "models/Prescription", "models/Medicine"], function (require, exports, sequelize_typescript_8, Prescription_1, Medicine_2) {
    "use strict";
    exports.__esModule = true;
    var Status = /** @class */ (function (_super) {
        __extends(Status, _super);
        function Status() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            sequelize_typescript_8.Column,
            __metadata("design:type", Number)
        ], Status.prototype, "patient_id");
        __decorate([
            sequelize_typescript_8.BelongsToMany(function () { return Medicine_2["default"]; }, function () { return Prescription_1["default"]; }, 'status_id', 'medicine_id'),
            __metadata("design:type", Array)
        ], Status.prototype, "medicines");
        __decorate([
            sequelize_typescript_8.Column,
            __metadata("design:type", Number)
        ], Status.prototype, "state_id");
        __decorate([
            sequelize_typescript_8.Column,
            __metadata("design:type", Boolean)
        ], Status.prototype, "is_draft");
        Status = __decorate([
            sequelize_typescript_8.Table({ tableName: 'status', timestamps: false })
        ], Status);
        return Status;
    }(sequelize_typescript_8.Model));
    exports["default"] = Status;
});
define("models/Patient", ["require", "exports", "sequelize-typescript", "models/Disease", "models/DiseaseCase", "models/PatientContradictions", "models/Status"], function (require, exports, sequelize_typescript_9, Disease_1, DiseaseCase_1, PatientContradictions_1, Status_1) {
    "use strict";
    exports.__esModule = true;
    var Patient = /** @class */ (function (_super) {
        __extends(Patient, _super);
        function Patient() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            sequelize_typescript_9.PrimaryKey,
            sequelize_typescript_9.Column,
            __metadata("design:type", Number)
        ], Patient.prototype, "id");
        __decorate([
            sequelize_typescript_9.Column,
            __metadata("design:type", String)
        ], Patient.prototype, "name");
        __decorate([
            sequelize_typescript_9.Column(sequelize_typescript_9.DataType.DATE),
            __metadata("design:type", Date)
        ], Patient.prototype, "birth_date");
        __decorate([
            sequelize_typescript_9.ForeignKey(function () { return Disease_1["default"]; }),
            sequelize_typescript_9.Column,
            __metadata("design:type", Number)
        ], Patient.prototype, "disease_id");
        __decorate([
            sequelize_typescript_9.BelongsTo(function () { return Disease_1["default"]; }),
            __metadata("design:type", Disease_1["default"])
        ], Patient.prototype, "disease");
        __decorate([
            sequelize_typescript_9.HasMany(function () { return DiseaseCase_1["default"]; }),
            __metadata("design:type", Array)
        ], Patient.prototype, "anamnesis");
        __decorate([
            sequelize_typescript_9.HasMany(function () { return PatientContradictions_1["default"]; }),
            __metadata("design:type", Array)
        ], Patient.prototype, "contradictions");
        __decorate([
            sequelize_typescript_9.Column,
            __metadata("design:type", Number)
        ], Patient.prototype, "current_status_id");
        __decorate([
            sequelize_typescript_9.BelongsTo(function () { return Status_1["default"]; }, 'current_status_id'),
            __metadata("design:type", Status_1["default"])
        ], Patient.prototype, "status");
        __decorate([
            sequelize_typescript_9.Column,
            __metadata("design:type", Number)
        ], Patient.prototype, "doctor_id");
        Patient = __decorate([
            sequelize_typescript_9.Table({ tableName: 'patient', timestamps: false })
        ], Patient);
        return Patient;
    }(sequelize_typescript_9.Model));
    exports["default"] = Patient;
});
define("models/DiseaseCase", ["require", "exports", "sequelize-typescript", "models/Patient", "models/Disease"], function (require, exports, sequelize_typescript_10, Patient_2, Disease_2) {
    "use strict";
    exports.__esModule = true;
    var DiseaseCase = /** @class */ (function (_super) {
        __extends(DiseaseCase, _super);
        function DiseaseCase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            sequelize_typescript_10.PrimaryKey,
            sequelize_typescript_10.AutoIncrement,
            sequelize_typescript_10.Column,
            __metadata("design:type", Number)
        ], DiseaseCase.prototype, "id");
        __decorate([
            sequelize_typescript_10.ForeignKey(function () { return Patient_2["default"]; }),
            sequelize_typescript_10.Column,
            __metadata("design:type", Number)
        ], DiseaseCase.prototype, "patientId");
        __decorate([
            sequelize_typescript_10.ForeignKey(function () { return Disease_2["default"]; }),
            sequelize_typescript_10.Column,
            __metadata("design:type", Number)
        ], DiseaseCase.prototype, "diseaseId");
        __decorate([
            sequelize_typescript_10.BelongsTo(function () { return Disease_2["default"]; }),
            __metadata("design:type", Disease_2["default"])
        ], DiseaseCase.prototype, "disease");
        __decorate([
            sequelize_typescript_10.BelongsTo(function () { return Patient_2["default"]; }),
            __metadata("design:type", Patient_2["default"])
        ], DiseaseCase.prototype, "patient");
        __decorate([
            sequelize_typescript_10.Default('HEALED'),
            sequelize_typescript_10.Column(sequelize_typescript_10.DataType.ENUM('ACTIVE', 'HEALED')),
            __metadata("design:type", String)
        ], DiseaseCase.prototype, "state");
        DiseaseCase = __decorate([
            sequelize_typescript_10.Table({ timestamps: true, tableName: 'disease_case' })
        ], DiseaseCase);
        return DiseaseCase;
    }(sequelize_typescript_10.Model));
    exports["default"] = DiseaseCase;
});
define("models/DiseaseContradictions", ["require", "exports", "models/Disease", "models/Substance", "sequelize-typescript"], function (require, exports, Disease_3, Substance_3, sequelize_typescript_11) {
    "use strict";
    exports.__esModule = true;
    var DiseaseContradictions = /** @class */ (function (_super) {
        __extends(DiseaseContradictions, _super);
        function DiseaseContradictions() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            sequelize_typescript_11.Index,
            sequelize_typescript_11.PrimaryKey,
            sequelize_typescript_11.Column,
            __metadata("design:type", Number)
        ], DiseaseContradictions.prototype, "diseaseId");
        __decorate([
            sequelize_typescript_11.BelongsTo(function () { return Disease_3["default"]; }, 'diseaseId'),
            __metadata("design:type", Disease_3["default"])
        ], DiseaseContradictions.prototype, "disease");
        __decorate([
            sequelize_typescript_11.PrimaryKey,
            sequelize_typescript_11.Column(sequelize_typescript_11.DataType.ENUM('ACTIVE', 'HEALED')),
            __metadata("design:type", String)
        ], DiseaseContradictions.prototype, "state");
        __decorate([
            sequelize_typescript_11.Index,
            sequelize_typescript_11.PrimaryKey,
            sequelize_typescript_11.Column,
            __metadata("design:type", Number)
        ], DiseaseContradictions.prototype, "withSubstanceId");
        __decorate([
            sequelize_typescript_11.BelongsTo(function () { return Substance_3["default"]; }, 'withSubstanceId'),
            __metadata("design:type", Substance_3["default"])
        ], DiseaseContradictions.prototype, "withSubstance");
        __decorate([
            sequelize_typescript_11.Column(sequelize_typescript_11.DataType.ENUM('LIGHT', 'AVERAGE', 'HIGH')),
            __metadata("design:type", String)
        ], DiseaseContradictions.prototype, "level");
        DiseaseContradictions = __decorate([
            sequelize_typescript_11.Table({ tableName: 'disease_contradictions' })
        ], DiseaseContradictions);
        return DiseaseContradictions;
    }(sequelize_typescript_11.Model));
    exports["default"] = DiseaseContradictions;
});
define("models/SubstanceContradictions", ["require", "exports", "models/Substance", "sequelize-typescript"], function (require, exports, Substance_4, sequelize_typescript_12) {
    "use strict";
    exports.__esModule = true;
    var SubstanceContradictions = /** @class */ (function (_super) {
        __extends(SubstanceContradictions, _super);
        function SubstanceContradictions() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            sequelize_typescript_12.Index,
            sequelize_typescript_12.PrimaryKey,
            sequelize_typescript_12.Column,
            __metadata("design:type", Number)
        ], SubstanceContradictions.prototype, "substanceId");
        __decorate([
            sequelize_typescript_12.BelongsTo(function () { return Substance_4["default"]; }, 'substanceId'),
            __metadata("design:type", Substance_4["default"])
        ], SubstanceContradictions.prototype, "substance");
        __decorate([
            sequelize_typescript_12.Index,
            sequelize_typescript_12.PrimaryKey,
            sequelize_typescript_12.Column,
            __metadata("design:type", Number)
        ], SubstanceContradictions.prototype, "withSubstanceId");
        __decorate([
            sequelize_typescript_12.BelongsTo(function () { return Substance_4["default"]; }, 'withSubstanceId'),
            __metadata("design:type", Substance_4["default"])
        ], SubstanceContradictions.prototype, "withSubstance");
        __decorate([
            sequelize_typescript_12.Column(sequelize_typescript_12.DataType.ENUM('LIGHT', 'AVERAGE', 'HIGH')),
            __metadata("design:type", String)
        ], SubstanceContradictions.prototype, "level");
        SubstanceContradictions = __decorate([
            sequelize_typescript_12.Table({ tableName: 'substance_contradictions' })
        ], SubstanceContradictions);
        return SubstanceContradictions;
    }(sequelize_typescript_12.Model));
    exports["default"] = SubstanceContradictions;
});
