new Vue({
    el: '#app',
    mounted() {
        console.log("In mounted");

        // Retrieve saved selections from localStorage
        const savedProduct = localStorage.getItem("selectedProduct");
        const savedBilling = localStorage.getItem("selectedBilling");
        const savedCategory = localStorage.getItem("activeCategory");

        this.activeCategory = savedCategory ? savedCategory : "web";
        if (savedProduct) {
            this.selectedProduct = JSON.parse(savedProduct);
        }

        if (savedBilling) {
            this.selectedBilling = JSON.parse(savedBilling);
        }

        // If no selection is stored, auto-select first available product & billing
        if (!this.selectedProduct || !this.selectedBilling) {
            this.autoSelectFirstItem();
        }

     this.addProductData()
    console.log("data",this.checkoutOverview[0].cart)
     
    },
    data() {
        return {
            checkoutOverview:[],
            tempCategory:null,
            activeCategory:"web" ,
            selectedProduct: null,
            selectedBilling: null,
            newDomain:"",
      selectedExtension: '.com',

      domainResults: [],
      // Cart functionality
      cartItems: [],
      wishlistItems: [],
  
      extensions: [{ extension: '.com', price: 12.99 },
        { extension: '.net', price: 10.99 },
        { extension: '.org', price: 9.99 },
        { extension: '.io', price: 34.99 },
        { extension: '.co', price: 22.99 },
        { extension: '.dev', price: 14.99 }],
        activewebDomainbar:"reg",
            webdomainCategory:[
                { id: "reg", name: "Register Domain" },
                { id: "trans", name: "Transfer  Domain" },
                {id:"used",name:"Use Owned Domain"}
            ],
            categories: [
                { id: "web", name: "Web Hosting" },
                { id: "vps", name: "VPS Hosting" },
                { id: "dedicated", name: "Dedicated Servers" }
            ],
            products: [
                { id: 1, category: "web", name: "Single", price: 2.99, time: "Monthly", Features: ["Basic Hosting", "1GB Storage", "10GB Bandwidth"] },
                { id: 2, category: "web", name: "Premium", price: 5.99, time: "Monthly", Features: ["Advanced Hosting", "5GB Storage", "50GB Bandwidth"] },
                { id: 3, category: "web", name: "Premium", price: 5.99, time: "Monthly", Features: ["Advanced Hosting", "5GB Storage", "50GB Bandwidth"] },
                { id: 4, category: "web", name: "Premium", price: 5.99, time: "Monthly", Features: ["Advanced Hosting", "5GB Storage", "50GB Bandwidth"] },
                { id: 5, category: "web", name: "Premium", price: 5.99, time: "Monthly", Features: ["Advanced Hosting", "5GB Storage", "50GB Bandwidth"] },
                { id: 6, category: "web", name: "Premium", price: 5.99, time: "Monthly", Features: ["Advanced Hosting", "5GB Storage", "50GB Bandwidth"] },
                { id: 7, category: "web", name: "Premium", price: 5.99, time: "Monthly", Features: ["Advanced Hosting", "5GB Storage", "50GB Bandwidth"] },
                { id: 8, category: "vps", name: "VPS-1", price: 9.99, time: "Monthly", Features: ["1 vCPU", "2GB RAM", "50GB SSD"] },
                { id: 9, category: "vps", name: "VPS-2", price: 19.99, time: "Monthly", Features: ["2 vCPU", "4GB RAM", "100GB SSD"] },
                { id: 10, category: "dedicated", name: "Dedicated-1", price: 99.99, time: "Monthly", Features: ["4 vCPU", "16GB RAM", "500GB SSD"] }
            ],
            
            productBilling: [
                { id: 1, category: "web", name: "Yearly Plan", price: "$17.92", oldprice: "$19.99", saving: "10%", permonth: "1.49" },
                { id: 2, category: "web", name: "Monthly Plan", price: "$5.99", oldprice: "$6.99", saving: "5%", permonth: "5.99" },
                { id: 3, category: "vps", name: "Yearly Plan", price: "$49.99", oldprice: "$59.99", saving: "15%", permonth: "4.17" },
                { id: 4, category: "vps", name: "Monthly Plan", price: "$9.99", oldprice: "$11.99", saving: "8%", permonth: "9.99" },
                { id: 5, category: "dedicated", name: "Dedicated Plan", price: "$499.99", oldprice: "$599.99", saving: "17%", permonth: "41.67" }
            ],            
            authType: 'create', // Default to create account
            login: {
              email: '',
              password: ''
            },
            register: {
              firstName: '',
              lastName: '',
              email: '',
              phoneCode: '+1',
              phone: '',
              company: '',
              country: 'United States',
              address1: '',
              address2: '',
              city: '',
              state: ''
            },
            paymentMethod: 'stripe', // Default to Stripe
      stripe: {
        cardNumber: '',
        expiry: '',
        cvc: '',
        name: ''
      },
      bank: {
        accountName: '',
        bankName: '',
        accountNumber: '',
        routingNumber: '',
        amount: ''
      },
      agreements: {
        terms: false,
        privacy: false,
        refund: false
      }
    
          
        };
    },
    computed: {
        filteredProducts() {
            return this.products.filter(product => product.category === this.activeCategory);
        },
        filteredBillingOptions() {
            return this.productBilling.filter(billing => billing.category === this.activeCategory);
        },
        chunkedProducts() {
          let chunkSize = 3;
          // if (window.innerWidth < 768) { // Corrected condition for small screens
          //     chunkSize = 1;
          // }
      
          let chunks = [];
          for (let i = 0; i < this.filteredProducts.length; i += chunkSize) {
              chunks.push(this.filteredProducts.slice(i, i + chunkSize));
          }
          
          return chunks;
      }
      
      
    },
    watch: {
        activeCategory() {
            this.autoSelectFirstItem();
            this.localStorage
        }
        ,   selectedProduct: "updateCheckoutOverview",
    selectedBilling: "updateCheckoutOverview",

    activeCraousal(){
      this.chunkSize()
    }
    },
    methods: {
      addProductData() {
        if (this.selectedProduct && this.selectedBilling) {
            this.checkoutOverview.push({
                product: { ...this.selectedProduct },
                billing: { ...this.selectedBilling },
                cart: [...this.cartItems]
            });
        } else {
            console.warn("selectedProduct or selectedBilling is null");
        }
    },
  
        updateCheckoutOverview() {
            if (this.selectedProduct && this.selectedBilling) {
                this.checkoutOverview = [this.selectedProduct, this.selectedBilling];
            }
        },
        selectProduct(product) {
            this.selectedProduct = product;
            localStorage.setItem("selectedProduct", JSON.stringify(product));
            console.log("Selected product:", product);
            

        },
        selectBillingOption(billing) {
            this.selectedBilling = billing;
            localStorage.setItem("selectedBilling", JSON.stringify(billing));
            console.log("Selected billing:", billing);
            

        },
        autoSelectFirstItem() {
            // Select the first product in the category if no product is selected
            if (!this.selectedProduct || this.selectedProduct.category !== this.activeCategory) {
                const firstProduct = this.filteredProducts.length > 0 ? this.filteredProducts[0] : null;
                if (firstProduct) {
                    this.selectProduct(firstProduct);
                }
            }

            // Select the first billing option in the category if no billing is selected
            if (!this.selectedBilling || this.selectedBilling.category !== this.activeCategory) {
                const firstBilling = this.filteredBillingOptions.length > 0 ? this.filteredBillingOptions[0] : null;
                if (firstBilling) {
                    this.selectBillingOption(firstBilling);
                }
            }
        },
        selectedCategory(categoryId) {
            this.activeCategory = categoryId;
            localStorage.setItem("activecategory",this.activeCategory)
            console.log(this.activeCategory)
        },
        confirmCategoryChange(categoryId) {
            this.tempCategory = categoryId;
            let modal = new bootstrap.Modal(document.getElementById("categoryChangeModal"));
            modal.show();
        },
        changeCategorys() {
            if (this.tempCategory) {
                this.activeCategory = this.tempCategory;
                localStorage.setItem("activeCategory", this.activeCategory);

                // Close the modal after updating the category
                let modalElement = document.getElementById("categoryChangeModal");
                let modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        

            },

            webactivebar(categoryId){
this.activewebDomainbar=categoryId
console.log(this.activewebDomainbar)
            },
            selectExtension(ext) {
                this.selectedExtension = ext.extension;
            },
            getPrice(ext) {
                const extension = this.extensions.find(e => e.ext === ext);
                return extension ? extension.price : 'N/A';
              },
              searchDomain() {
                if (!this.newDomain) return;
                
                // Simulate API call
                this.domainResults = this.extensions.map(ext => ({
                  domain: `${this.newDomain}`,
                  price: ext.price,
                  extension: ext.extension
                }));
              },
              addToCart(domain, years) {
                // const existingItem = this.cartItems.find(
                //   item => item.domain === domain.domain && item.years === years
                // );
                
             
                
                this.cartItems.push({
                  domain: domain.domain,
                  extension: domain.extension,
                  years: years,
                  pricePerYear: domain.price,
                  totalPrice: (domain.price * years).toFixed(2)
                });
                
              },

              processStripePayment() {
                console.log('Processing Stripe Payment:', {
                  cardNumber: this.stripe.cardNumber,
                  expiry: this.stripe.expiry,
                  cvc: this.stripe.cvc,
                  name: this.stripe.name
                });
                alert('Stripe payment processed (check console for details)');
              },
              processBankTransfer() {
                console.log('Processing Bank Transfer:', {
                  accountName: this.bank.accountName,
                  bankName: this.bank.bankName,
                  accountNumber: this.bank.accountNumber,
                  routingNumber: this.bank.routingNumber,
                  amount: this.bank.amount
                });
                alert('Bank transfer initiated (check console for details)');
              },
              validateAgreements() {
                if (!this.agreements.terms) {
                  alert("Please agree to the Terms of Service");
                  return;
                }
                
                if (!this.agreements.privacy) {
                  alert("Please agree to the GDPR Privacy Notice");
                  return;
                }
                
                if (!this.agreements.refund) {
                  alert("Please agree to the Refund Policy");
                  return;
                }
                
                // All checkboxes are checked
                alert("Thank you for agreeing to all policies!");
                console.log("User agreed to:", this.agreements);
                // Proceed with your form submission or next step
              },
            
              ProceedCheckout() {
                if (!this.checkoutOverview.length) {
                    alert('Please select a product and billing plan.');
                    return;
                }
                if (!this.activewebDomainbar) {
                    alert('Please select a domain.');
                    return;
                }
                if (!this.cartItems.length) {
                    alert('Your cart is empty.');
                    return;
                }
                if (!this.login.email && !this.register.firstName) {
                    alert('Please fill in your account details.');
                    return;
                }
                if (this.paymentMethod === 'stripe' && !this.stripe.cardNumber) {
                    alert('Please enter your Stripe payment details.');
                    return;
                }
                if (this.paymentMethod === 'bank' && !this.bank.accountName) {
                    alert('Please enter your bank transfer details.');
                    return;
                }
                if (!this.agreements.terms || !this.agreements.privacy || !this.agreements.refund) {
                    alert('You must agree to all terms and conditions.');
                    return;
                }
                console.log('Checkout Details:', {
                    checkoutOverview: this.checkoutOverview,
                    cartItems: this.cartItems,
                    activewebDomainbar: this.activewebDomainbar,
                    login: this.login,
                    register: this.register,
                    paymentMethod: this.paymentMethod,
                    stripe: this.stripe,
                    bank: this.bank,
                    agreements: this.agreements
                });
                alert('Checkout successful!');
            }
        
            
          
            
    
    }
});
