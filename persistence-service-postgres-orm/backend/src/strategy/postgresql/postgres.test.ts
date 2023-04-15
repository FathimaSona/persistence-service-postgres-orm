import {postgresDataSource} from './configure';
import { Truck } from "./truck/truck";

let datasource:any = null;
beforeAll(async ()=>{
    datasource = await postgresDataSource.initialize();
});

describe("postgresql", () => {
    describe("postgresDataSource", () => {
      beforeEach(() => {
        
      });
  
      it("will create a postgres data source", async () => {
        
        expect(datasource).toBeTruthy();
      });
    });
    describe("create method", () => {
        beforeEach(async () => {

            await datasource
            .createQueryBuilder()
            .delete()
            .from(Truck)
            .where("not truckNumber=:truckNumber", {truckNumber:0})
            .execute();
            
        });
        it("will insert a new row to the database", async () => {
            const truck = new Truck();
            truck.truckNumber=1;
      
            truck.brand = "RAM";
            truck.load =5000 ;
            truck.capacity =3500;
            truck.year=2020;
            truck.numRepairs= 13;
            await datasource.manager.save(Truck);
            const truckIn = await datasource.manager.findBy(Truck, {
                brand: "RAM",
            });
            expect(truckIn[0].brand).toBe("RAM");
        });

    });    

    describe("read method", () => {
        beforeEach(async () => {

            await datasource
            .createQueryBuilder()
            .select("brand")
            .from(Truck)
            .where("truckdetails.brand = :brand", {brand:"RAM"})
            .getOne();
            
        });
        it("will read a row from the database", async () => {
            const truckIn = await datasource.manager.findBy(Truck, {
                brand: "RAM",
            });
            expect(truckIn[0].brand).toBe("RAM");
        });

    }); 

    describe("update method", () => {

        beforeEach(async () => {
        await datasource
        .createQueryBuilder()
        .update(Truck)
        .set({load:"6000"})
        .where("Truck.brand = :brand", {brand:"RAM"})
        .execute();
        });
        it("will update the data in database", async () => {
        const truckIn = await datasource.manager.findBy(Truck, {
        brand: "RAM",
        });
        console.log("hihi",truckIn);
        expect(truckIn[0].Payload).toBe(6000);
        }); 
        });
        });

    describe("delete method", () => {
        beforeEach(async () => {

            await datasource
            .createQueryBuilder()
            .delete()
            .from(Truck)
            .where("not Tnumber=:tnumber", {tnumber:0})
            .execute();
            
        });
        it("will delete all row in the database", async () => {
            const truckIn = await datasource.manager.findBy(Truck, {
                brand: "RAM",
            });
            //console.log("tfgjhgd",truckIn)
            expect(truckIn).toEqual([]);
        });


        
    }); 

    describe("Edge cases: ", () => {
        beforeEach(async () => {

            await datasource
            .createQueryBuilder()
            .delete()
            .from(Truck)
            .where("not Tnumber=:tnumber", {tnumber:0})
            .execute();
            
        });
        it("it should create a Truck with brand name upto 20 characters", async () => {
            const truck = new Truck();
            truck.truckNumber=1;
      
            truck.brand = "12345678901234567890";
            truck.load =5000 ;
            truck.capacity =3500;
            truck.year=2020;
            truck.numRepairs= 13;
            await datasource.manager.save(Truck);
            const truckIn = await datasource.manager.findBy(Truck, {
                brand: "12345678901234567890",
            });
            expect(truckIn[0].brand).toBe("12345678901234567890")
           
     
        });





        
    }); 


    
    describe("Negative cases: ", () => {
        beforeEach(async () => {

            await datasource
            .createQueryBuilder()
            .delete()
            .from(Truck)
            .where("not Tnumber=:tnumber", {tnumber:0})
            .execute();
            
        });
        it("it should not create a truck with load other than data type integer", async () => {

            const data: any = {
                truckNumber: 1,
                brand: 'abc',
                load: 'sfdsf@@@@',
                capacity: 3500,
                year: 2020,
                numRepairs: 3
            }
            const truck = new Truck();
            truck.truckNumber=1;
      
            truck.brand = data.brand;
            truck.load =data.load ;
            truck.capacity =data.capacity;
            truck.year=data.year;
            truck.numRepairs= data.numRepairs;
            await datasource.manager.save(Truck);
            const truckIn = await datasource.manager.findBy(Truck, {
                brand: "abc",
            });
            expect(truckIn[0].brand).toBe("abc")
           
     
        });

        it("it should not create a truck with empty brand name", async () => {

            const data: any = {
                truckNumber: 1,
                brand: 'abc',
                load: 1,
                capacity: 3500,
                year: 2020,
                numRepairs: 3
            }
            const truck = new Truck();
            truck.truckNumber=1;
      
            truck.brand = data.brand;
            truck.load =data.load ;
            truck.capacity =data.capacity;
            truck.year=data.year;
            truck.numRepairs= data.numRepairs;
            await datasource.manager.save(Truck);
            const truckIn = await datasource.manager.findBy(Truck, {
                brand: "abc",
            });

            const truckUpd = await datasource
            .createQueryBuilder()
            .update(Truck)
            .set({brand:""})
            .where("Truck.brand = :brand", {brand:"abc"})
            .execute();

            expect(truckUpd[0].brand).toBe("")
           
     
        });





        
    }); 
});  