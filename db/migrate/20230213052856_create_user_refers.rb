class CreateUserRefers < ActiveRecord::Migration[7.0]
  def change
    create_table :user_refers do |t|
      t.references :user, null: false, foreign_key: true
      t.string :email

      t.timestamps
    end
  end
end
