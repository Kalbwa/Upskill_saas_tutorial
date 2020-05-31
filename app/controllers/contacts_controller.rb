class ContactsController < ApplicationController
  
  # get request to "/contact-us"
  # show new contact form 
  def new
    @contact = Contact.new
  end
  
  # Post request to "contacts"
  def create
    # mass assignment of form fields into contact object
    @contact = Contact.new(contact_params)
    # save the contact object to the database 
    if @contact.save
      # Store form fields via parameters, into variables
      name = params[:contact][:name]
      email = params[:contact][:email]
      body = params[:contact][:comments]
      # Plugs variables into the Contact Mailer 
      # email method and send
      ContactMailer.contact_email(name, email, body).deliver
      # Store success message in flash hash
      # and redirect to the new action
      flash[:success] = "Message sent"
      redirect_to new_contact_path #notice: "Message sent."
    else
      # If contact object does not save,
      # store errors in flash hash,
      # and redirect to the new action
      flash[:danger] = @contact.errors.full_messages.join(", ")
      redirect_to new_contact_path #notice: "Error occured."
    end
  end
  
  private
  # To collect data from forms, we need to use
  # strong parameters and whitelist the form fields
    def contact_params
      params.require(:contact).permit(:name, :email, :comments)
    end
end
