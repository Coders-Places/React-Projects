

const Car = require("./car");
const connectToDb = require("./db");

connectToDb();

// Car.create({
//     modelNo: "heyththuteu",
//     extraFeatures: ["new bumper", "Auto Pilot", "AI Driving"],
//     PartnerShipWith: {
//         companyName: "Lambo",
//         modelNo: "343pu",
//         NumberPlate: "utehu4u"
//     }
// })

const newNote = { modelNo: "new updeuoeuoaeuuoeated" }

// You should set the new option to true to return the document after update was applied.
// Car.findByIdAndUpdate('63430e7ce2d67f55185ac40e', { $set: newNote }, { new: true }).then(doc => console.log('updated', doc))

async function func() {
    try {
        // Copying the Object into the 'car' variable
        const car = await Car.create({
            modelNo: "hhh33u33",
            extraFeatures: ['bumper', "effecient drifting", "AI-Support"],
            PartnerShipWith: {
                companyName: "BMW",
                modelNo: '318is',
                NumberPlate: "3423e3"
            },
            Gears: 5,
            NumberOfHeadLight: 5


        });

        // changing the modelNo is From "heroshima" to "Nakasaki"
        car.modelNo = "AUDI";

        // Now, Saving it to the [Data-Base]
        await car.save();
        console.log(car)

    } catch (error) {
        console.log("error", error.message)
    }

}

func();




async function query() {
    const car = await Car.where("modelNo").equals("AUDI")
    console.log("doc ", car)

}

query()



